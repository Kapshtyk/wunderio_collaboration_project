import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import { useTranslation } from "next-i18next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { LayoutProps } from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Paragraph } from "@/components/paragraph";
import { WorkCards } from "@/components/work-cards";
import { WorkArticleCard } from "@/components/workArticleCard";
import { createLanguageLinks } from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { Article, validateAndCleanupArticle } from "@/lib/zod/article";
import { Page as PageType, validateAndCleanupPage } from "@/lib/zod/page";
import { HeadingSection } from "@/lib/zod/paragraph";
import { validateAndCleanupWork, Work } from "@/lib/zod/work";

interface WorkPageProps extends LayoutProps {
  mainPage: Work;
  allWorkPages: PageType[];
  allArticles: Article[];
}

export default function WorkPage({
  mainPage,
  allWorkPages,
  allArticles,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("homepage-link"),
      url: "/",
    },
    {
      title: t("work-link"),
      url: "/work",
    },
  ];

  return (
    <>
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <div
        className=" bg-primary-800 relative mb-6"
        style={{ height: "350px" }}
      >
        <div className=" absolute inset-0 bg-cover bg-center bg-[url('/work-hero.jpg')] opacity-20"></div>
        <div className="p-20 flex relative">
          <div className="grid gap-4">
            {mainPage.field_content_elements?.map((paragraph) => (
              <Paragraph key={paragraph.id} paragraph={paragraph} />
            ))}
          </div>
        </div>
      </div>

      {
        <div>
          <WorkCards allWorkPages={allWorkPages} />
        </div>
      }

      <div className="my-20">
        <h1 className="font-bold">OUR CLIENTS</h1>
        <LogoStrip />
      </div>

      <div>
        <h1 className="font-bold mb-4">MORE ABOUT OUR CLIENTS</h1>
        <div className="grid grid-cols-3 gap-3">
          {allArticles
            .filter((workArticles) =>
              workArticles.field_tags.some(
                (field_tag) => field_tag?.name === "Client",
              ),
            )
            .sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime(),
            )
            .slice(0, 3)
            .map((workArticle) => (
              <WorkArticleCard workArticle={workArticle} />
            ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<WorkPageProps> = async (
  context,
) => {
  const mainPage = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--work_main_page",
      context,
      {
        params: getNodePageJsonApiParams(
          "node--work_main_page",
        ).getQueryObject(),
      },
    )
  ).at(0);

  const nodeTranslations = await getNodeTranslatedVersions(
    mainPage,
    context,
    drupal,
  );

  const languageLinks = createLanguageLinks(nodeTranslations);

  const pages = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--page",
    context,
    {
      params: getNodePageJsonApiParams("node--page")
        .addFilter("field_page_type.name", "Work")
        .getQueryObject(),
    },
  );

  // console.log("pages: ", pages);

  const articles = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--article",
    context,
    {
      params: getNodePageJsonApiParams("node--article").getQueryObject(),
    },
  );

  return {
    props: {
      ...(await getCommonPageProps(context)),
      mainPage: validateAndCleanupWork(mainPage),
      allWorkPages: pages.map((node) => validateAndCleanupPage(node)),
      allArticles: articles.map((node) => validateAndCleanupArticle(node)),
      languageLinks,
    },
  };
};
