import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import EventsArticles from "@/components/events-articles.tsx";
import { HeadingPage } from "@/components/heading--page";
import { LayoutProps } from "@/components/layout";
import { Meta } from "@/components/meta";
import { createLanguageLinksForNextOnlyPage } from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import {
  validateAndCleanupEvents,
} from "@/lib/zod/events";
import { validateAndCleanupArticleTeaser } from "@/lib/zod/article-teaser";
import { EventsArticles as EventsArticlesType } from "@/lib/zod/events-articles";


interface EventsPageProps extends LayoutProps {
  items: EventsArticlesType[]
}

export default function EventsPage({
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  const breadcrumbs = [
    {
      title: t("events-link"),
      url: "/events",
    },
  ];

  return (
    <>
      <Meta title={t("events-main-title")} />
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <HeadingPage
        title={t("events-main-title")}
        description={t("events-main-description")}
      />
      <EventsArticles items={items} />
    </>
  );
}

export const getStaticProps: GetStaticProps<EventsPageProps> = async (
  context,
) => {
  const events = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--event",
    context,
    {
      params: getNodePageJsonApiParams("node--event").getQueryObject(),
    },
  );

  const validatedEvents = events.map((event) =>
    validateAndCleanupEvents(event),
  );

  const articles = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--article", context, {
    params: getNodePageJsonApiParams("node--article").getQueryObject(),
  });

  const validatedArticleTeasers = articles.map((teaser) =>
    validateAndCleanupArticleTeaser(teaser),
  );

  const items = [...validatedEvents, ...validatedArticleTeasers];

  const languageLinks = createLanguageLinksForNextOnlyPage("/events", context);
  return {
    props: {
      ...(await getCommonPageProps(context)),
      items,
      languageLinks,
    },
    revalidate: 60,
  };
};
