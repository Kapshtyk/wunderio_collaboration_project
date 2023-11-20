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
import { Page, validateAndCleanupPage } from "@/lib/zod/page";
import { getNodePageJsonApiParams, ResourceType } from "@/lib/drupal/get-node-page-json-api-params";
import { Paragraph } from "@/components/paragraph";
import NotFoundPage from "../404";


interface WorkPageProps {
    workPage: Page;
}

export default function WorkPage({
    workPage
}: InferGetStaticPropsType<typeof getStaticProps>) {

    const breadcrumbs = [
        {
            title: "Home",
            url: "/"
        },
        {
            title: "Work",
            url: "/work"
        },
        {
            title: workPage.title,
            url: "/work/" + workPage.title
        }
    ]
    console.log("work", workPage);

    return (
        workPage && workPage.field_page_type && workPage.field_page_type.name === "Work" ? (
            <>
                <Meta title={workPage.title} metatags={workPage.metatag} />
                <div className="container">
                    {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
                </div>

                <div>
                    {workPage.field_content_elements.map((paragraph) => (
                        <Paragraph key={paragraph.id} paragraph={paragraph} />
                    ))}
                </div>
            </>
        ) : <NotFoundPage />
    )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    const paths = await drupal.getStaticPathsFromContext('node--page', context);
    return {
        paths: paths,
        fallback: "blocking",
    };
};


export const getStaticProps: GetStaticProps<WorkPageProps> = async (
    context,
) => {
    const path: DrupalTranslatedPath =
        await drupal.translatePathFromContext(context);

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

    });

    if (!resource) {
        throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
    }

    if (!context.preview && resource?.status === false) {
        return {
            notFound: true,
        };
    }
    /*  const nodeTranslations = await getNodeTranslatedVersions(
       resource,
       context,
       drupal,
     );
   
     const languageLinks = createLanguageLinks(nodeTranslations); */

    return {
        props: {
            ...(await getCommonPageProps(context)),
            workPage: validateAndCleanupPage(resource),
            /* languageLinks, */
        },
        revalidate: 60,
    };
};
