import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import { useTranslation } from "next-i18next";
import { LayoutProps } from "@/components/layout";
import { drupal } from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { Work, validateAndCleanupWork } from "@/lib/zod/work";
import { HeadingSection } from "@/lib/zod/paragraph";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { WorkCards } from "@/components/work-cards";
import { Page as PageType, validateAndCleanupPage } from "@/lib/zod/page";
import { LogoStrip } from "@/components/logo-strip";
import { Article, validateAndCleanupArticle } from "@/lib/zod/article";
import { WorkArticleCard } from "@/components/workArticleCard";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { createLanguageLinks } from "@/lib/contexts/language-links-context";
import { divide } from "cypress/types/lodash";

//From here
interface WorkPageProps extends LayoutProps {
    mainPage: Work
    allPages: PageType[]
    tags: DrupalTaxonomyTerm[]
    allArticles: Article[];

}

export default function WorkPage({
    mainPage,
    allPages,
    tags,
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
        }
    ]
    console.log("workPages:", allPages)

    const headingSection = mainPage.field_content_elements.find((element) => element.type === "paragraph--heading_section") as HeadingSection

    return (
        <>
            <div className="container">
                {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
            </div>
            <div className=" bg-primary-800 relative mb-6" style={{ height: "350px" }}>
                <div className=" absolute inset-0 bg-cover bg-center bg-[url('/work-hero.jpg')] opacity-20"></div>
                <div className="p-20 flex relative">
                    <h1 className="font-bold text-2xl mr-20 text-white">{headingSection.field_heading}</h1>
                    <span className="text-lg text-white">{headingSection.field_excerpt}</span>
                </div>
            </div>

            <div>
                <WorkCards allPages={allPages} tags={tags} />
            </div>



            <div className="my-20">
                <h1 className="font-bold">OUR CLIENTS</h1>
                <LogoStrip />
            </div>


            <div>
                <h1 className="font-bold mb-4">MORE ABOUT OUR CLIENTS</h1>
                <div className="grid grid-cols-3 gap-3">

                    {allArticles
                        .filter((workArticles) =>
                            workArticles.field_tags.some((field_tag) => field_tag?.name === "Client")
                        )
                        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                        .slice(0, 3)
                        .map((workArticle) => (
                            <WorkArticleCard workArticle={workArticle} />
                        ))}
                </div>
            </div>

        </>
    );
}

export const getStaticProps: GetStaticProps<WorkPageProps> = async (
    context,
) => {
    const mainPage = (
        await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--work", context,
            {
                params: getNodePageJsonApiParams("node--work").getQueryObject()
            },
        )
    ).at(0);

    console.log("mainPage:" + mainPage)

    const nodeTranslations = await getNodeTranslatedVersions(
        mainPage,
        context,
        drupal,
    );

    const languageLinks = createLanguageLinks(nodeTranslations);


    const pages = await drupal.getResourceCollectionFromContext<
        DrupalNode[]>("node--page", context,
            {
                params: getNodePageJsonApiParams("node--page").getQueryObject()
            });

    const tags = (
        await drupal.getResourceCollectionFromContext<DrupalTaxonomyTerm[]>("taxonomy_term--page_type", context,
            {

            },
        )
    )
    console.log('tags: ', tags)

    const articles = await drupal.getResourceCollectionFromContext<
        DrupalNode[]>("node--article", context,
            {
                params: getNodePageJsonApiParams("node--article").getQueryObject()
            });

    return {
        props: {
            ...(await getCommonPageProps(context)),
            mainPage: validateAndCleanupWork(mainPage),
            allPages: pages.map((node) => validateAndCleanupPage(node)),
            tags,
            allArticles: articles.map((node) => validateAndCleanupArticle(node)),
            languageLinks,

        },
    };
};


