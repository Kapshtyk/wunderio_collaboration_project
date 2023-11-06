import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";

import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";

import {
  createLanguageLinks,
  LanguageLinks,
} from "@/lib/contexts/language-links-context";
import { getCommonPageProps } from "@/lib/get-common-page-props";

import { OpenPositions, validateAndCleanupOpenPositions } from "@/lib/zod/open-positions";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { drupal } from "@/lib/drupal/drupal-client";
import { DrupalNode, DrupalTranslatedPath } from "next-drupal";
import { BasicInfo, validateAndCleanupBasicInfo } from "@/lib/zod/careers";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface OpenPositionProps extends LayoutProps {
  openPosition: OpenPositions;
  /* languageLinks: LanguageLinks; */
  basicInformation: BasicInfo
}

export default function OpenPosition({
  openPosition, basicInformation
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const breadcrumbs = [
    {
      title: "home",
      url: "/"
    },
    {
      title: "careers",
      url: "/careers"
    },
    {
      title: openPosition.title,
      url: "/careers/" + openPosition.title
    }
  ]
  return (
    <>
      <Meta title={openPosition.title} metatags={openPosition.metatag} />
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <h1 className="text-2xl text-bold">
        {openPosition.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: openPosition.body.processed }}
        className="mt-6 font-serif text-xl leading-loose prose"
      />
      <div
        dangerouslySetInnerHTML={{ __html: basicInformation.body.processed }}
        className="mt-6 font-serif text-xl leading-loose prose"
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const paths = await drupal.getStaticPathsFromContext('node--open_positions', context);
  return {
    paths: paths,
    fallback: "blocking",
  };
};


export const getStaticProps: GetStaticProps<OpenPositionProps> = async (
  context,
) => {
  const path: DrupalTranslatedPath =
    await drupal.translatePathFromContext(context);

  if (!path) {
    return {
      notFound: true,
    };
  }

  const basicInformation = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--basic_info_related_to_all_positi",
      context)
  ).at(0);

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context, {
    params: {
      include:
        "uid,uid,field_basic_info,field_country,field_office,field_position,field_position_image"
    }
  });

  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
  }

  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    };
  }
  /*  const nodeTranslations = await getNodeTranslatedVersions(
     resource,
     context,
     drupal,
   );
 
   const languageLinks = createLanguageLinks(nodeTranslations); */

  return {
    props: {
      ...(await getCommonPageProps(context)),
      openPosition: validateAndCleanupOpenPositions(resource),
      basicInformation: validateAndCleanupBasicInfo(basicInformation),
      /* languageLinks, */
    },
    revalidate: 60,
  };
};
