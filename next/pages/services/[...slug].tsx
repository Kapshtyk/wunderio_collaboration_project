import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode, DrupalTranslatedPath } from "next-drupal";
import { useTranslation } from "next-i18next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FormattedText } from "@/components/formatted-text";
/* import { HeadingParagraph } from "@/components/heading--paragraph"; */
import { Meta } from "@/components/meta";
import { Paragraph } from "@/components/paragraph";
/* import { ParagraphHeadingSection } from "@/components/paragraph--heading-section";
import { ParagraphText } from "@/components/paragraph--text"; */
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
import { HeadingSection } from "@/lib/zod/paragraph";
import {
  Services as ServicesType,
  validateAndCleanupServices,
} from "@/lib/zod/services";
import { Page as PageType, validateAndCleanupPage } from "@/lib/zod/page";
import { WorkWorkCard } from "@/components/workWorkCard";
import { shuffleArray } from "@/lib/utils";
import { ParagraphLabelledImage } from "@/components/paragraph--labelled-image";
import { ParagraphVideo } from "@/components/paragraph--video";
import { useRef} from "react";
import useScrollReveal from "@/lib/hooks/scroll-animation";

interface ServicesProps extends CommonPageProps {
  services: ServicesType;
  allServices: ServicesType;
  servicesTypes: ServicesType[];
  allWorkPages: PageType[];
  languageLinks: LanguageLinks;
}

export default function ServicesPages({
  services,
  allServices,
  servicesTypes,
  allWorkPages
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  const breadcrumbs = [
    {
      title: t("services"),
      url: "/services",
    },
    {
      title: services.title,
      url: "/services/" + services.title,
    },
  ];

  const revealRef = useRef<HTMLDivElement>(null);
  useScrollReveal(revealRef);

  return (
    <>
      <Meta title={services.title} metatags={services.metatag} />
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <div>
        {services.field_content_elements?.map((paragraph) => {
          const { field_excerpt: _, ...props } = paragraph as HeadingSection;
          return (
            <>
              {paragraph.type === "paragraph--heading_section" && (
                <Paragraph key={paragraph.id} paragraph={props} />
              )}
              {paragraph.type === "paragraph--formatted_text" && (
                <section className="w-full max-w-[1216px] max-md:max-w-full py-10">
                  <FormattedText
                    html={paragraph.field_formatted_text.processed}
                  />
                </section>
              )}
                {paragraph.type === "paragraph--labelled_image" && (
                  <ParagraphLabelledImage key={paragraph.id} paragraph={paragraph}/>
                )}
                {paragraph.type === "paragraph--video" && (
                  <ParagraphVideo key={paragraph.id} paragraph={paragraph}/>
                )}
            </>
          );
        })}
      </div>
          <ServicesTypes
            servicesTypes={servicesTypes}
            allServices={allServices}
          />
      <div className="mt-20">
          <h1 className="font-bold mb-4 uppercase">{t("related-content")}</h1>
          <div ref={revealRef} className="md:grid grid-cols-3 gap-3 transition-opacity duration-800 ease-in-out">
            {shuffleArray(allWorkPages)
              .slice(0, 3)
              .map((workPage) => (
                <WorkWorkCard key={workPage.id} workPage={workPage} />
              ))}
          </div>
        </div>
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

  const pages = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--page",
    context,
    {
      params: getNodePageJsonApiParams("node--page")
        .addFilter("field_page_type.name", "Work")
        .getQueryObject(),
    },
  );

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
      allWorkPages: pages.map((node) => validateAndCleanupPage(node)),
      languageLinks,
    },
    revalidate: 60,
  };
};
