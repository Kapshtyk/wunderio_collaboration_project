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
        <div key={subHeading.id}>
          <div className="flex h-[100px] bg-primary-400/40 justify-between" id={subHeading.id}>
          <h1>{subHeading.field_heading}</h1>
          <span>{subHeading.field_excerpt}</span>
          </div>
          {tags
            .filter((tag) => tag.name === subHeading.field_heading)
            .map((tag) => (
              <div key={tag.id}>
                <h2>{tag.name}</h2>
                {services
                  .filter(
                    (service) =>
                      service.field_service_types.name === tag.name
                  )
                  .map((service) => (
                    <div key={service.id}>
                      <Link 
                        key={service.id}
                        href={'services' + service.path.alias}
                        className="text-primary-600"
                        >
                      {service.title}
                      </Link>
                     
                      {service.field_content_elements?.map((item) => {
                        if (
                          "field_heading" in item &&
                          "field_excerpt" in item
                        ) {
                          if (
                            item.type === "paragraph--heading_section"
                          ) {
                            return (
                              <p key={item.id}>{item.field_excerpt}</p>
                            );
                          }
                        }
                        return null;
                      })}
                    </div>
                  ))}
              </div>
            ))}
        </div>
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

