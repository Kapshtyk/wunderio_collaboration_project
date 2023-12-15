import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode, DrupalTranslatedPath } from "next-drupal";
import { useTranslation } from "next-i18next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Meta } from "@/components/meta";
import { Paragraph } from "@/components/paragraph";
import ServicesTypes from "@/components/services-types";
import {
  createLanguageLinks,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import {
  getNodePageJsonApiParams,
  ResourceType,
} from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import {
  CommonPageProps,
  getCommonPageProps,
} from "@/lib/get-common-page-props";
import {HeadingSection } from "@/lib/zod/paragraph";
import {
  Services as ServicesType,
  validateAndCleanupServices,
} from "@/lib/zod/services";
import { ParagraphText } from "@/components/paragraph--text";
import { FormattedText } from "@/components/formatted-text";
import { ParagraphHeadingSection } from "@/components/paragraph--heading-section";
import { HeadingParagraph } from "@/components/heading--paragraph";

interface ServicesProps extends CommonPageProps {
  services: ServicesType;
  allServices: ServicesType;
  servicesTypes: ServicesType[];
  languageLinks: LanguageLinks;
}

export default function ServicesPages({
  services,
  allServices,
  servicesTypes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  const breadcrumbs = [
    {
      title: t("home"),
      url: "/",
    },
    {
      title: t("services"),
      url: "/services",
    },
    {
      title: services.title,
      url: "/services/" + services.title,
    },
  ];

  return (
    <>
      <Meta title={services.title} metatags={services.metatag} />
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <div>
        {services.field_content_elements?.map((paragraph) => {
          const { field_excerpt: _, ...props } = paragraph as HeadingSection;
          return(
            <>
            {paragraph.type === "paragraph--heading_section" && (
              <Paragraph key={paragraph.id} paragraph={props} />
            )}
            {paragraph.type === "paragraph--formatted_text" && (
              <div>
                <FormattedText className="flex" html={paragraph.field_formatted_text.processed}/>
              </div>
            )}
            </>
          
          )       
        })}
      </div>
     
      <ServicesTypes servicesTypes={servicesTypes} allServices={allServices} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await drupal.getStaticPathsFromContext(
    "node--services_page",
    context,
  );
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ServicesProps> = async (
  context,
) => {
  const path: DrupalTranslatedPath = await drupal.translatePathFromContext(
    context,
    {
      pathPrefix: "/services",
    },
  );

  if (!path) {
    return {
      notFound: true,
    };
  }

  const allServices = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--services_page",
      context,
      {
        params: getNodePageJsonApiParams("node--services_page")
          .addFilter("title", "Services")
          .getQueryObject(),
      },
    )
  ).at(0);

  const servicesTypes = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--services_page", context, {
    params: getNodePageJsonApiParams("node--services_page").getQueryObject(),
  });

  const type = path.jsonapi.resourceName as ResourceType;

  const apiParams = getNodePageJsonApiParams(type).getQueryObject();

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params: apiParams,
      pathPrefix: "/services",
    },
  );

  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
  }

  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    };
  }
  const nodeTranslations = await getNodeTranslatedVersions(
    resource,
    context,
    drupal,
  );

  const languageLinks = createLanguageLinks(nodeTranslations);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      services: validateAndCleanupServices(resource),
      allServices: validateAndCleanupServices(allServices),
      servicesTypes: servicesTypes
        .filter((node) => node.title !== "Services")
        .map((node) => validateAndCleanupServices(node)),
      languageLinks,
    },
    revalidate: 60,
  };
};
