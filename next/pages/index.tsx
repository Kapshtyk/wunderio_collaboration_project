import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";

import HeroBanner from "@/components/hero-banner";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import NewsArticlesEvents from "@/components/news-articles-events";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { validateAndCleanupAboutUs } from "@/lib/zod/about-us";
import { validateAndCleanupArticleTeaser } from "@/lib/zod/article-teaser";
import { validateAndCleanupEvents } from "@/lib/zod/events";
import { EventsArticles } from "@/lib/zod/events-articles";
import { Frontpage, validateAndCleanupFrontpage } from "@/lib/zod/frontpage";
import { validateAndCleanupLegalDocument } from "@/lib/zod/legal-document";
import { Services, validateAndCleanupServices } from "@/lib/zod/services";
import ServicesFrontPage from "@/components/services-types-frontpage";

interface IndexPageProps extends LayoutProps {
  frontpage: Frontpage | null;
  items: EventsArticles[];
  allServices: Services;
  servicesTypes: Services[];
}

export default function IndexPage({
  frontpage,
  items,
  allServices,
  servicesTypes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title={frontpage?.title} metatags={frontpage?.metatag} />
      <HeroBanner />
      <ServicesFrontPage allServices={allServices} servicesTypes={servicesTypes}/>
      {/* <NewsArticlesEvents items={items} /> */}
    </>
  );
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async (
  context,
) => {
  const frontpage = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--frontpage",
      context,
      {
        params: getNodePageJsonApiParams("node--frontpage").getQueryObject(),
      },
    )
  ).at(0);

  const promotedArticleTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--article", context, {
    params: {
      "filter[status]": 1,
      "filter[langcode]": context.locale,
      "filter[promote]": 1,
      "fields[node--article]":
        "title,path,field_image,uid,created,field_excerpt,field_tags",
      include: "field_image,uid,field_tags",
      sort: "-sticky,-created",
      "page[limit]": 3,
    },
  });

  const validatedArticleTeasers = promotedArticleTeasers.map((teaser) =>
    validateAndCleanupArticleTeaser(teaser),
  );

  const events = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--event",
    context,
    {
      params: getNodePageJsonApiParams("node--event")
        .addPageLimit(3)
        .addSort("created", "ASC")
        .getQueryObject(),
    },
  );

  const validatedEvents = events.map((event) =>
    validateAndCleanupEvents(event),
  );

  const items = [...validatedArticleTeasers, ...validatedEvents];

  const aboutUs = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--about_us",
      context,
      {
        params: getNodePageJsonApiParams("node--about_us").getQueryObject(),
      },
    )
  ).at(0);

  const legalDocument = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--legal_document",
      context,
      {
        params: getNodePageJsonApiParams(
          "node--legal_document",
        ).getQueryObject(),
      },
    )
  ).at(0);

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

  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage: frontpage ? validateAndCleanupFrontpage(frontpage) : null,
      items,
      aboutUs: validateAndCleanupAboutUs(aboutUs),
      legalDocument: validateAndCleanupLegalDocument(legalDocument),
      allServices: validateAndCleanupServices(allServices),
      servicesTypes: servicesTypes
        .filter((node) => node.title !== "Services")
        .map((node) => validateAndCleanupServices(node)),
    },
    revalidate: 60,
  };
};
