import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import {
  DrupalNode,
  DrupalTaxonomyTerm,
  DrupalTranslatedPath,
} from "next-drupal";
import { useTranslation } from "next-i18next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { LayoutProps } from "@/components/layout";
import { Paragraph } from "@/components/paragraph";
import SubHeadingSectionComponent from "@/components/services-subHeading-section";
import { createLanguageLinks } from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import {
  getNodePageJsonApiParams,
  ResourceType,
} from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { SubHeadingSection } from "@/lib/zod/paragraph";
import { Services, validateAndCleanupServices } from "@/lib/zod/services";

interface ServicesProps extends LayoutProps {
  mainPage: Services;
  services: Services[];
  tags: DrupalTaxonomyTerm[];
}

export default function ServicesPage({
  services,
  mainPage,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("Home"),
      url: "/",
    },
    {
      title: t("Services"),
      url: "/services",
    },
  ];

  const subHeadings = mainPage.field_content_elements.filter(
    (item) => item.type === "paragraph--sub_heading_section",
  ) as SubHeadingSection[];

  return (
    <>
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <div className="grid gap-4">
        {mainPage.field_content_elements?.map((paragraph) => (
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        ))}
      </div>
      <div>
        <p>Jump to:</p>
        {subHeadings.map((sub) => (
          <li>
            <Link
              href={`#${sub.id}`}
              scroll={false}
              style={{ scrollMarginTop: "20px" }}
            >
              {sub.field_heading}
            </Link>
          </li>
        ))}
      </div>
      {subHeadings.map((subHeading) => (
        <SubHeadingSectionComponent
          key={subHeading.id}
          subHeading={subHeading}
          tags={tags}
          services={services}
        />
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps<ServicesProps> = async (
  context,
) => {
  const mainPage = (
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

  const pages = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--services_page",
    context,
    {
      params: getNodePageJsonApiParams("node--services_page").getQueryObject(),
    },
  );

  // console.log(pages);

  const tags = await drupal.getResourceCollectionFromContext<
    DrupalTaxonomyTerm[]
  >("taxonomy_term--advisory", context, {});

  const nodeTranslations = await getNodeTranslatedVersions(
    mainPage,
    context,
    drupal,
  );

  const languageLinks = createLanguageLinks(nodeTranslations);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      mainPage: validateAndCleanupServices(mainPage),
      services: pages
        .filter((node) => node.title !== "Services")
        .map((node) => validateAndCleanupServices(node)),
      tags,
      languageLinks,
    },
  };
};
