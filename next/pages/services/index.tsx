import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
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

interface ServicesProps {
  mainPage: Services;
  services: Services [];
  tags: DrupalTaxonomyTerm[]
}

export default function ServicesPage({
  services, mainPage, tags
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const breadcrumbs = [
    {
      title: "Home",
      url: "/"
    },
    {
      title: "Services",
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
          <Link href={`#${sub.id}`} scroll={false}>{sub.field_heading}</Link>
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
  )
  const tags = (
    await drupal.getResourceCollectionFromContext<DrupalTaxonomyTerm[]>("taxonomy_term--advisory", context,
      {
       
      },
    )
  )


  return {
    props: {
      ...(await getCommonPageProps(context)),
      mainPage: validateAndCleanupServices(mainPage),
      services: pages.filter((node) => node.title !== "Services" ).map((node) => validateAndCleanupServices(node)),
      tags
    },
  };
};

