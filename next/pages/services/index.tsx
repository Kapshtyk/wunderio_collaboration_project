import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { LayoutProps } from "@/components/layout";

import { drupal } from "@/lib/drupal/drupal-client";
import { getCommonPageProps } from "@/lib/get-common-page-props";

import { Careers, validateAndCleanupCareers } from "@/lib/zod/careers";
import { OpenPositions as OpenPositionsType, validateAndCleanupOpenPositions } from "@/lib/zod/open-positions";
import { CareersForm } from "@/components/careers-form";
import { Paragraph } from "@/components/paragraph";
import { HeadingSection } from "@/lib/zod/paragraph";
import OpenPositions from "@/components/open-positions";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { Services } from "@/lib/zod/services";

interface ServicesPageProps extends LayoutProps {
  services: Services;
  servicePages: ServicePages[]
}

export default function ServicesPage({
  services,
  servicePages
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const breadcrumbs = [
    {
      title: "Home",
      url: "/"
    },
    {
      title: "Careers",
      url: "/careers"
    }
  ]

  return (
    <>
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      {/* <div className="flex h-[100px] bg-primary-400/40 justify-between">
        <h1>{headingSection.field_heading}</h1>
        <span>{headingSection.field_excerpt}</span>
      </div>
      <div className="grid gap-4">
        {
          services.field_content_elements?.map((paragraph) => (
            <Paragraph key={paragraph.id} paragraph={paragraph} />
          ))
        }
      </div>
      <CareersForm />
      <OpenPositions openPositions={openPositions} /> */}
    </>
  );
}


export const getStaticProps: GetStaticProps<ServicesPageProps> = async (
  context,
) => {
  const services = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--services_page", context,
      {
        params: getNodePageJsonApiParams("node--services_page").getQueryObject()
      },
    )
  ).at(0);

services.field_content_elements.map((e)=> console.log(e.field_listing_type))
  // const openPositions = await drupal.getResourceCollectionFromContext<
  //   DrupalNode[]>("node--open_positions", context,
  //     {
  //       params: getNodePageJsonApiParams("node--open_positions").getQueryObject()
  //     })

  return {
    props: {
      ...(await getCommonPageProps(context)),
      // careers: validateAndCleanupCareers(careers),
      // openPositions: openPositions.map((node) => validateAndCleanupOpenPositions(node))
    },
  };
};
