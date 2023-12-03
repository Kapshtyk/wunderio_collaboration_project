import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import Events from "@/components/events";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Paragraph } from "@/components/paragraph";
import {
  createLanguageLinks,
  createLanguageLinksForNextOnlyPage,
} from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  Events as EventsType,
  validateAndCleanupEvents,
} from "@/lib/zod/events";
import CookiesComponent from "@/components/cookies";

export default function Cookies({
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return <CookiesComponent />

}

export const getStaticProps: GetStaticProps = async (
  context,
) => {

  const languageLinks = createLanguageLinksForNextOnlyPage("/cookies", context);
  return {
    props: {
      ...(await getCommonPageProps(context)),
      languageLinks,
    },
    revalidate: 60,
  };
};

