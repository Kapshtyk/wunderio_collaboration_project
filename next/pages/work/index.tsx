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
import { HeadingSection, Testimonials as TestimonialsType } from "@/lib/zod/paragraph";
import { validateAndCleanupWork, Work } from "@/lib/zod/work";
import { Numbers as NumbersType, validateAndCleanupNumbers } from "@/lib/zod/numbers";
import Numbers from "@/components/numbers";
import { validateAndCleanupTestimonial } from "@/lib/zod/testimonials";
import Testimonials from "@/components/testimonials";
import { title } from "process";

interface WorkPageProps extends LayoutProps {
  mainPage: Work;
  allWorkPages: PageType[];
  allArticles: Article[];
  wunderNumbers: NumbersType[];
  testimonials: TestimonialsType[];
}

export default function WorkPage({
  mainPage,
  allWorkPages,
  allArticles,
  wunderNumbers,
  testimonials,
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
      <div>
        <div className="grid gap-4">
          {mainPage.field_content_elements?.map((paragraph) => (
            <Paragraph key={paragraph.id} paragraph={paragraph} />
          ))}
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
        <Numbers numbers={wunderNumbers} />
      </div>

      <div>
        <h1 className="font-bold mb-4">MORE ABOUT OUR CLIENTS</h1>
        <div className="md:grid grid-cols-3 gap-3">
          {allArticles
            .filter((workArticles) =>
              workArticles.field_tags?.some(
                (field_tag) => field_tag?.name === "Client",
              ),
            )
            .sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime(),
            )
            .slice(0, 3)
            .map((workArticle) => (
              <WorkArticleCard key={workArticle.id} workArticle={workArticle} />
            ))}
        </div>
      </div>
      <div>
        <Testimonials testimonials={testimonials} />
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

  const numbers = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--numbers",
    context,
    {
      params: getNodePageJsonApiParams("node--numbers").addFilter('field_numbers_type.name', 'Wunder in Numbers').getQueryObject()
    },
  );
  const testimonials = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--testimonials",
    context,
    {
      params: getNodePageJsonApiParams("node--testimonials").addFilter('field_person_category.name', 'Client').getQueryObject()
    },
  );

  return {
    props: {
      ...(await getCommonPageProps(context)),
      mainPage: validateAndCleanupWork(mainPage),
      allWorkPages: pages.map((node) => validateAndCleanupPage(node)),
      allArticles: articles.map((node) => validateAndCleanupArticle(node)),
      wunderNumbers: numbers.map((node) => validateAndCleanupNumbers(node)),
      testimonials: testimonials.map((node) => validateAndCleanupTestimonial(node)),
      languageLinks,
    },
  };
};
