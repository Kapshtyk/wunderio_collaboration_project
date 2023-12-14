import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";

import HeroBanner from "@/components/hero-banner";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { validateAndCleanupAboutUs } from "@/lib/zod/about-us";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { Frontpage, validateAndCleanupFrontpage } from "@/lib/zod/frontpage";
import { validateAndCleanupLegalDocument } from "@/lib/zod/legal-document";

interface IndexPageProps extends LayoutProps {
  frontpage: Frontpage | null;
  promotedArticleTeasers?: ArticleTeaser[];
}

export default function IndexPage({
  frontpage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title={frontpage?.title} metatags={frontpage?.metatag} />
      <HeroBanner />
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
      "fields[node--article]": "title,path,field_image,uid,created",
      include: "field_image,uid",
      sort: "-sticky,-created",
      "page[limit]": 3,
    },
  });

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

  return {
    props: {
      ...(await getCommonPageProps(context)),
      frontpage: frontpage ? validateAndCleanupFrontpage(frontpage) : null,
      promotedArticleTeasers: promotedArticleTeasers.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser),
      ),
      aboutUs: validateAndCleanupAboutUs(aboutUs),
      legalDocument: validateAndCleanupLegalDocument(legalDocument),
    },
    revalidate: 60,
  };
};
