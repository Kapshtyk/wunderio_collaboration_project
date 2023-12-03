import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode, DrupalTaxonomyTerm, DrupalTranslatedPath, DrupalView } from "next-drupal";
import { useTranslation } from "next-i18next";


import { drupal } from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props";

import { Paragraph } from "@/components/paragraph";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ResourceType, getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { Services, validateAndCleanupServices } from "@/lib/zod/services";
import { LayoutProps } from "@/components/layout";
import { SubHeadingSection } from "@/lib/zod/paragraph";
import Link from "next/link";
import SubHeadingSectionComponent from "@/components/services-subHeading-section";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { createLanguageLinks } from "@/lib/contexts/language-links-context";
import { validateAndCleanupOfficeLocations } from "@/lib/zod/office-locations";
import OfficeLocations from "@/components/office-map";

interface ServicesProps extends LayoutProps {
  mainPage: Services;
  services: Services [];
  tags: DrupalTaxonomyTerm[];
  // view: DrupalView
}

export default function ServicesPage({
  services, mainPage, tags, 
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {t} = useTranslation();
  const breadcrumbs = [
    {
      title: t("Home"),
      url: "/"
    },
    {
      title: t("Services"),
      url: "/services"
    }
  ]

  
 
const subHeadings = mainPage.field_content_elements.filter(item=>item.type === "paragraph--sub_heading_section") as SubHeadingSection [];

  return (

    <>
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <div className="grid gap-4">
         {
          mainPage.field_content_elements?.map((paragraph) => (
            <Paragraph key={paragraph.id} paragraph={paragraph} />
          ))
        }
     </div> 
     <div>
      <p>Jump to:</p>
      {subHeadings.map((sub)=> (
        <li>
          <Link href={`#${sub.id}`} scroll={false} style={{scrollMarginTop:"20px"}}>{sub.field_heading}</Link>
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
      <OfficeLocations/>
    </>
  );
}

export const getStaticProps: GetStaticProps<ServicesProps> = async (
  context,
) => {

  const mainPage = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--services_page", context,
      {
        params: getNodePageJsonApiParams("node--services_page").addFilter('title', 'Services').getQueryObject()
      },
    )
  ).at(0);
  
  const pages = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--services_page", context,
      {
        params: getNodePageJsonApiParams("node--services_page").getQueryObject()
      },
    )
  );

  const maps = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--office_locations",{
      params: getNodePageJsonApiParams('node--office_locations').getQueryObject()
    })
  ).at(0)


  // console.log('maps:',maps);
  
  const tags = (
    await drupal.getResourceCollectionFromContext<DrupalTaxonomyTerm[]>("taxonomy_term--advisory", context,
      {
       
      },
    )
  )

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
      services: pages.filter((node) => node.title !== "Services" ).map((node) => validateAndCleanupServices(node)),
      tags,
      // view,
      maps:validateAndCleanupOfficeLocations(maps),
      languageLinks
    },
  };
};

