import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode, DrupalTranslatedPath } from "next-drupal";
import { useTranslation } from "next-i18next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { createLanguageLinks } from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { BasicInfo, validateAndCleanupBasicInfo } from "@/lib/zod/careers";
import {
  OpenPositions,
  validateAndCleanupOpenPositions,
} from "@/lib/zod/open-positions";

interface OpenPositionProps extends LayoutProps {
  openPosition: OpenPositions;
  basicInformation: BasicInfo;
}

export default function OpenPosition({
  openPosition,
  basicInformation,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("careers-link"),

      url: "/careers",
    },
    {
      title: openPosition.title,
      url: "/careers/" + openPosition.title,
    },
  ];
  return (
    <>
      <Meta title={openPosition.title} metatags={openPosition.metatag} />
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <HeadingPage title={openPosition.title} />
      <section className="section-margin">
        <FormattedText html={openPosition.body.processed} />
        <FormattedText html={basicInformation.body.processed} />
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await drupal.getStaticPathsFromContext(
    "node--open_positions",
    context,
  );
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<OpenPositionProps> = async (
  context,
) => {
  const path: DrupalTranslatedPath = await drupal.translatePathFromContext(
    context,
    {
      pathPrefix: "/careers",
    },
  );

  if (!path) {
    return {
      notFound: true,
    };
  }

  const basicInformation = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--basic_info_related_to_all_positi",
      context,
    )
  ).at(0);

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params: getNodePageJsonApiParams("node--open_positions").getQueryObject(),
    },
  );

  const nodeTranslations = await getNodeTranslatedVersions(
    resource,
    context,
    drupal,
  );

  const languageLinks = createLanguageLinks(nodeTranslations);

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
      openPosition: validateAndCleanupOpenPositions(resource),
      basicInformation: validateAndCleanupBasicInfo(basicInformation),
      languageLinks,
    },
    revalidate: 60,
  };
};
