import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { Meta } from "@/components/meta";
import {
    createLanguageLinks,
    LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { drupal } from "@/lib/drupal/drupal-client";
import { DrupalNode, DrupalTranslatedPath } from "next-drupal";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Page as PageType, validateAndCleanupPage } from "@/lib/zod/page";
import { getNodePageJsonApiParams, ResourceType } from "@/lib/drupal/get-node-page-json-api-params";
import { Paragraph } from "@/components/paragraph";
import NotFoundPage from "../404";
import { WorkWorkCard } from "@/components/workWorkCard";
import { Article, validateAndCleanupArticle } from "@/lib/zod/article";
import { WorkArticleCard } from "@/components/workArticleCard";


interface WorkPageProps {
    currentWorkPage: PageType;
    allPages: PageType[];
    allArticles: Article[];
}

export default function WorkPage({
    currentWorkPage,
    allPages,
    allArticles,

}: InferGetStaticPropsType<typeof getStaticProps>) {
    const { t } = useTranslation();
    const breadcrumbs = [
        {
            title: t("Home"),
            url: "/"
        },
        {
            title: t("Work"),
            url: "/work"
        },
        {
            title: (currentWorkPage.title),
            url: "/work/" + currentWorkPage.title
        }
    ]
    console.log("CurrentWorkPage", currentWorkPage);

    const allowedWorkPageTitles = [
        "Tikkurila",
        "Luke.fi",
        "Fortum",
        "HUS – Helsinki University Hospital",
    ].filter(Boolean);


    return (
        currentWorkPage && currentWorkPage.field_page_types && currentWorkPage.field_page_types.name === "Work" ? (
            <>
                <Meta title={currentWorkPage.title} metatags={currentWorkPage.metatag} />
                <div className="container">
                    {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
                </div>

                <div>
                    {currentWorkPage.field_content_elements.map((paragraph) => (
                        <Paragraph key={paragraph.id} paragraph={paragraph} />
                    ))}
                </div>


                {allowedWorkPageTitles.includes(currentWorkPage.title) ? (
                    <div className="mt-20">
                        <h1 className="font-bold my-4">RELATED CONTENT</h1>
                        <div className="flex space-x-6">

                            {allPages
                                .filter((workPages) => workPages.field_page_types?.name === "Work")
                                .filter((workPages) => workPages.title !== currentWorkPage.title)
                                .slice(0, 4)
                                .map((workPage) => (
                                    <WorkWorkCard workPage={workPage} />
                                ))}
                        </div>
                    </div>
                ) : null
                }

                {
                    currentWorkPage.title === "Trimble" ? (
                        <div className="mt-20">
                            <h1 className="font-bold mb-4">RELATED CONTENT</h1>
                            <div className="grid grid-cols-3 gap-3">

                                {allArticles
                                    .filter((workArticles) =>
                                        workArticles.field_tags.some((field_tag) => field_tag?.name === "Drupal")
                                    )
                                    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                                    .slice(0, 3)
                                    .map((workArticle) => (
                                        <WorkArticleCard workArticle={workArticle} />
                                    ))}
                            </div>
                        </div>
                    ) : null
                }
            </>

        ) : <NotFoundPage />
    )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    const paths = await drupal.getStaticPathsFromContext('node--page', context,);
    return {
        paths: paths,
        fallback: "blocking",
    };
};


export const getStaticProps: GetStaticProps<WorkPageProps> = async (
    context,
) => {
    const path: DrupalTranslatedPath =
        await drupal.translatePathFromContext(context,
            { pathPrefix: "/work" }
        );

    if (!path) {
        return {
            notFound: true,
        };
    }

    const type = path.jsonapi.resourceName as ResourceType;

    const resource = await drupal.getResourceFromContext<DrupalNode>(
        path,
        context, {
        params: getNodePageJsonApiParams(type).getQueryObject(),
        pathPrefix: "/work"


    });

    const nodeTranslations = await getNodeTranslatedVersions(
        resource,
        context,
        drupal,
    );

    const languageLinks = createLanguageLinks(nodeTranslations);

    if (!resource) {
        throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
    }

    if (!context.preview && resource?.status === false) {
        return {
            notFound: true,
        };
    }


    const pages = await drupal.getResourceCollectionFromContext<
        DrupalNode[]>("node--page", context,
            {
                params: getNodePageJsonApiParams("node--page").getQueryObject()
            });

    const articles = await drupal.getResourceCollectionFromContext<
        DrupalNode[]>("node--article", context,
            {
                params: getNodePageJsonApiParams("node--article").getQueryObject()
            });

    return {
        props: {
            ...(await getCommonPageProps(context)),
            currentWorkPage: validateAndCleanupPage(resource),
            allPages: pages.map((node) => validateAndCleanupPage(node)),
            allArticles: articles.map((node) => validateAndCleanupArticle(node)),
            languageLinks,


        },
        revalidate: 60,
    };
};
