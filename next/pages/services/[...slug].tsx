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


interface ServicesProps {
  services: ServicesType
}

export default function ServicesPages({
  services
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
        {services.field_content_elements?.map((paragraph)=> (
          <Paragraph key={paragraph.id} paragraph={paragraph}/>
        ))}
        
      </div>
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
    },
    revalidate: 60,
  };
};
