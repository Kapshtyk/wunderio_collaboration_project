import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import { useTranslation } from "next-i18next";

/* import clsx from "clsx";
 */
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FormattedText } from "@/components/formatted-text";
/* import { HeadingPage } from "@/components/heading--page"; */
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
/* import OfficeLocations from "@/components/office-map";
import { Paragraph } from "@/components/paragraph"; */
import { ParagraphHeadingSection } from "@/components/paragraph--heading-section";
/* import { ParagraphText } from "@/components/paragraph--text"; */
import SubHeadingSectionComponent from "@/components/services-subHeading-section";
import { createLanguageLinks } from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { validateAndCleanupOfficeLocations } from "@/lib/zod/office-locations";
import { SubHeadingSection } from "@/lib/zod/paragraph";
import { Services, validateAndCleanupServices } from "@/lib/zod/services";
import ArrowDownIcon from "@/styles/icons/arrow-down.svg";

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
      title: t("Services"),
      url: "/services",
    },
  ];

  const subHeadings = mainPage.field_content_elements.filter(
    (item) => item.type === "paragraph--sub_heading_section",
  ) as SubHeadingSection[];

  return (
    <>
      <Meta title={mainPage.title} metatags={mainPage.metatag} />
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <div className="grid gap-4">
        {mainPage.field_content_elements?.map((paragraph) => {
          return (
            <>
              {paragraph.type === "paragraph--heading_section" && (
                <ParagraphHeadingSection
                  key={paragraph.id}
                  paragraph={paragraph}
                />
              )}
            </>
          );
        })}
      </div>
      <section className="mt-10 mb-10 flex flex-col items-center sm:flex-row">
        <p>{t("jump-to")}:</p>
        <ul className="flex flex-wrap gap-2">
          {subHeadings.map((sub) => (
            <li key={sub.id} className="p-2">
              <Link
                href={`#${sub.id}`}
                scroll={false}
                style={{ scrollMarginTop: "20px" }}
                className="text-main text-sm hover:underline flex items-center transition duration-300 ease-in-out transform hover:scale-105"
              >
                <ArrowDownIcon className="h-5 w-5 mr-2" />
                <span className="text-main">{sub.field_heading}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="w-full grid grid-cols-1 gap-8">
        {mainPage.field_content_elements?.map((paragraph) => {
          return (
            <>
              {paragraph.type === "paragraph--formatted_text" && (
                <div className="flex gap-14 ">
                  <div>
                    <FormattedText
                      key={paragraph.id}
                      html={paragraph.field_formatted_text.processed}
                    />
                  </div>
                </div>
              )}
            </>
          );
        })}
      </section>
      <section>
        {subHeadings.map((subHeading) => (
          <SubHeadingSectionComponent
            key={subHeading.id}
            subHeading={subHeading}
            tags={tags}
            services={services}
          />
        ))}
      </section>
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

  const maps = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--office_locations",
      {
        params: getNodePageJsonApiParams(
          "node--office_locations",
        ).getQueryObject(),
      },
    )
  ).at(0);

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
      maps: validateAndCleanupOfficeLocations(maps),
      languageLinks,
    },
  };
};
