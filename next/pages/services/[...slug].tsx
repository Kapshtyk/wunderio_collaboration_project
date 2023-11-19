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
import { Services as ServicesType, validateAndCleanupServices} from "@/lib/zod/services";
import { getNodePageJsonApiParams, ResourceType } from "@/lib/drupal/get-node-page-json-api-params";
import { Paragraph } from "@/components/paragraph";
import { HeadingSection } from "@/lib/zod/paragraph";
import ServicesTypes from "@/components/services-types";
import SubHeadingSectionComponent from "@/components/services-subHeading-section";


interface ServicesProps {
  services: ServicesType
  allServices: ServicesType
  servicesTypes: ServicesType [] 
}

export default function ServicesPages({
  services, allServices, servicesTypes
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const breadcrumbs = [
    {
      title: "home",
      url: "/"
    },
    {
      title: "services",
      url: "/services"
    },
    {
      title: services.title,
      url: "/services/" + services.title
    }
  ]
  
  return (
    <>
      <Meta title={services.title} metatags={services.metatag} />
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <div>
        {services.field_content_elements?.map((paragraph)=> {
          const { field_excerpt, ...props } = paragraph as HeadingSection;
         return (
          <Paragraph key={paragraph.id} paragraph={props}/>
         )
        })}
      </div>
      <ServicesTypes servicesTypes={servicesTypes} allServices={allServices}/>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await drupal.getStaticPathsFromContext('node--services_page', context);
  return {
    paths: paths,
    fallback: "blocking",
  };
};


export const getStaticProps: GetStaticProps<ServicesProps> = async (
  context,
) => {
  const path: DrupalTranslatedPath =
    await drupal.translatePathFromContext(context);

  if (!path) {
    return {
      notFound: true,
    };
  }

  const allServices = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--services_page",
      context, {
        params: getNodePageJsonApiParams("node--services_page").addFilter('title', 'Services').getQueryObject()
      })
  ).at(0);

  const servicesTypes = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--services_page",
      context, {
        params: getNodePageJsonApiParams("node--services_page").getQueryObject()
      })
  );

  const type = path.jsonapi.resourceName as ResourceType;

  const apiParams = getNodePageJsonApiParams(type).getQueryObject()

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context, {
    params: apiParams
  });

  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
  }

  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    };
  }


  return {
    props: {
      ...(await getCommonPageProps(context)),
      services: validateAndCleanupServices(resource),
      allServices: validateAndCleanupServices(allServices),
      servicesTypes: servicesTypes.filter((node) => node.title !== "Services" ).map((node) => validateAndCleanupServices(node)),
    },
    revalidate: 60,
  };
};
