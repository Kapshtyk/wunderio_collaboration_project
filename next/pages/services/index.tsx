import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import { useTranslation } from "next-i18next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { LayoutProps } from "@/components/layout";
import { Paragraph } from "@/components/paragraph";
import SubHeadingSectionComponent from "@/components/services-subHeading-section";
import { createLanguageLinks } from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { SubHeadingSection } from "@/lib/zod/paragraph";
import { Services, validateAndCleanupServices } from "@/lib/zod/services";
import { validateAndCleanupOfficeLocations } from "@/lib/zod/office-locations";
import OfficeLocations from "@/components/office-map";
import {ParagraphHeadingSection} from "@/components/paragraph--heading-section";
import { ParagraphText } from "@/components/paragraph--text";

interface ServicesProps extends LayoutProps {
  mainPage: Services;
  services: Services[];
  tags: DrupalTaxonomyTerm[];
  // view: DrupalView;
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
        {mainPage.field_content_elements?.map((paragraph) =>  {
          return(
          <>
           {paragraph.type === 'paragraph--heading_section' && 
          <ParagraphHeadingSection key={paragraph.id} paragraph={paragraph} />
          }
          </>
  
        )})}
      </div>
      <div>
      <ul className="flex gap-8">
      <span>Jump to:</span>
        {subHeadings.map((sub) => (
          <li key={sub.id}>
            <Link
              href={`#${sub.id}`}
              scroll={false}
              style={{ scrollMarginTop: "20px" }}
            >
              <span className="text-primary-900 text-sm hover:underline">{sub.field_heading.toUpperCase()}</span>
            </Link>
          </li>
        ))}
      </ul>
      </div>
      <div>
        {mainPage.field_content_elements?.map((paragraph) =>  {
          return(
          <>
           {paragraph.type === 'paragraph--formatted_text' && 
          <ParagraphText key={paragraph.id} paragraph={paragraph} />
          }
          </>
  
        )})}
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

  // console.log('maps:',maps);

  const tags = await drupal.getResourceCollectionFromContext<
    DrupalTaxonomyTerm[]
  >("taxonomy_term--advisory", context, {});

  //   const view = (
  //     await drupal.getView("office_address_marker--block_1",{
  //       params:{
  //         fields:{
  //           "node--office_locations": "title,field_office_address,field_address"
  //         }
  //       }
  //     })
  //   )

  // console.log("view:", view);

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
      // view,
      maps: validateAndCleanupOfficeLocations(maps),
      languageLinks,
    },
  };
};
