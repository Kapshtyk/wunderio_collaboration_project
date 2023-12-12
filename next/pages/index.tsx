import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import { useTranslation } from "next-i18next";

import { ArticleTeasers } from "@/components/article-teasers";
import { ContactForm } from "@/components/contact-form";
import { ContactList } from "@/components/contact-list";
import { LayoutProps } from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Meta } from "@/components/meta";
import { Paragraph } from "@/components/paragraph";
import { drupal } from "@/lib/drupal/drupal-client";
import {
  getNodePageJsonApiParams,
  ResourceType,
} from "@/lib/drupal/get-node-page-json-api-params";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { validateAndCleanupAboutUs } from "@/lib/zod/about-us";
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser,
} from "@/lib/zod/article-teaser";
import { Frontpage, validateAndCleanupFrontpage } from "@/lib/zod/frontpage";

import { Divider } from "@/ui/divider";
import { validateAndCleanupLegalDocument } from "@/lib/zod/legal-document";
import { Button } from "@/ui/button";

interface IndexPageProps extends LayoutProps {
  frontpage: Frontpage | null;
  promotedArticleTeasers: ArticleTeaser[];
}

export default function IndexPage({
  frontpage,
  promotedArticleTeasers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();

  return (
    <>
      <Meta title={frontpage?.title} metatags={frontpage?.metatag} />
      <main className='flex flex-wrap justify-start'>
        <div className='w-1/12 h-16 bg-primary-50'></div>
        <div className='w-1/12 h-16 bg-primary-100'></div>
        <div className='w-1/12 h-16 bg-primary-200'></div>
        <div className='w-1/12 h-16 bg-primary-300'></div>
        <div className='w-1/12 h-16 bg-primary-400'></div>
        <div className='w-1/12 h-16 bg-primary-500'></div>
        <div className='w-1/12 h-16 bg-primary-600'></div>
        <div className='w-1/12 h-16 bg-primary-700'></div>
        <div className='w-1/12 h-16 bg-primary-800'></div>
        <div className='w-1/12 h-16 bg-primary-900'></div>
        <div className='w-1/12 h-16 bg-primary-900/50'></div>
        <div className='w-1/12 h-16 bg-primary-900/75'></div>
        <div className='w-1/12 h-16 bg-secondary-50'></div>
        <div className='w-1/12 h-16 bg-secondary-100'></div>
        <div className='w-1/12 h-16 bg-secondary-200'></div>
        <div className='w-1/12 h-16 bg-secondary-300'></div>
        <div className='w-1/12 h-16 bg-secondary-400'></div>
        <div className='w-1/12 h-16 bg-secondary-500'></div>
        <div className='w-1/12 h-16 bg-secondary-600'></div>
        <div className='w-1/12 h-16 bg-secondary-700'></div>
        <div className='w-1/12 h-16 bg-secondary-800'></div>
        <div className='w-1/12 h-16 bg-secondary-900'></div>
        <div className='w-1/12 h-16 bg-secondary-900/50'></div>
        <div className='w-1/12 h-16 bg-secondary-900/75'></div>
        <div className='w-1/12 h-16 bg-accent-hugs'></div>
        <div className='w-1/12 h-16 bg-accent-bittersweet'></div>
        <div className='w-1/12 h-16 bg-accent-evergreen'></div>
        <div className='w-1/12 h-16 bg-accent-fog'></div>
        <div className='w-1/12 h-16 bg-accent-mellow'></div>
        <div className='w-1/12 h-16 bg-accent-rose'></div>
        <div className='w-1/12 h-16 bg-accent-orange'></div>
        <div className='w-1/12 h-16 bg-accent-peach-fuzz'></div>
        <div className='w-1/12 h-16 bg-info'></div>
        <div className='w-1/12 h-16 bg-success'></div>
        <div className='w-1/12 h-16 bg-warning'></div>
        <div className='w-1/12 h-16 bg-error'></div>
        <div className='w-1/12 h-16 bg-transparent'></div>
        <div className='w-1/12 h-16 bg-current'></div>
        <div className='w-1/12 h-16 bg-steelgray'></div>
        <div className='w-1/12 h-16 bg-scapaflow'></div>
        <div className='w-1/12 h-16 bg-stone'></div>
        <div className='w-1/12 h-16 bg-topaz'></div>
        <div className='w-1/12 h-16 bg-graysuit'></div>
        <div className='w-1/12 h-16 bg-mischka'></div>
        <div className='w-1/12 h-16 bg-white'></div>
        <div className="w-full">
          <div className="w-full text-heading-2xl">Text-heading-2xl</div>
          <div className="w-full text-heading-xl">Text-heading-xl</div>
          <div className="w-full text-heading-lg">Text-heading-lg</div>
          <div className="w-full text-heading-md">Text-heading-md</div>
          <div className="w-full text-heading-sm">Text-heading-sm</div>
          <div className="w-full text-heading-xs">Text-heading-xs</div>
          <div className="w-full text-xl">Text-xl</div>
          <div className="w-full text-lg">Text-lg</div>
          <div className="w-full text-md">Text-md</div>
          <div className="w-full text-sm">Text-sm</div>
          <div className="w-full text-xs">Text-xs</div>
        </div>
        <div className="w-full flex gap-16 flex-wrap justify-between mt-4">
          <div className="w-64 h-64 flex items-center justify-center font-light bg-primary-50/50 rounded-md shadow-xs">Shadow-xs</div>
          <div className="w-64 h-64 flex items-center justify-center font-light bg-primary-50/50 rounded-md shadow-sm">Shadow-sm</div>
          <div className="w-64 h-64 flex items-center justify-center font-light bg-primary-50/50 rounded-md shadow-md">Shadow-md</div>
          <div className="w-64 h-64 flex items-center justify-center font-light bg-primary-50/50 rounded-md shadow-lg">Shadow-lg</div>
          <div className="w-64 h-64 flex items-center justify-center font-light bg-primary-50/50 rounded-md shadow-xl">Shadow-xl</div>
          <div className="w-64 h-64 flex items-center justify-center font-light bg-primary-50/50 rounded-md shadow-2xl">Shadow-2xl</div>
        </div>
        <div className="p-4 w-full items-center flex gap-16 flex-wrap justify-between mt-4">
          <Button variant="primary" size="xs">Primary xs</Button>
          <Button variant="primary" size="sm">Primary sm</Button>
          <Button variant="primary" size="md">Primary md</Button>
          <Button variant="primary" size="lg">Primary lg</Button>
          <Button variant="primary" size="xl">Primary xl</Button>
        </div>
        <div className="p-4 w-full bg-accent-peach-fuzz items-center flex gap-16 flex-wrap justify-between mt-4">
          <Button variant="secondary" size="xs">Secondary xs</Button>
          <Button variant="secondary" size="sm">Secondary sm</Button>
          <Button variant="secondary" size="md">Secondary md</Button>
          <Button variant="secondary" size="lg">Secondary lg</Button>
          <Button variant="secondary" size="xl">Secondary xl</Button>

        </div>

      </main>




      {/* <div className="grid gap-4">
        {frontpage?.field_content_elements?.map((paragraph) => (
          <Paragraph paragraph={paragraph} key={paragraph.id} />
        ))}
      </div> */}
      {/* <Divider className="max-w-4xl" /> */}
      {/* <ContactForm /> */}
      {/* <Divider className="max-w-4xl" /> */}
      {/* <ArticleTeasers
        articles={promotedArticleTeasers}
        heading={t("promoted-articles")}
      />
      <ContactList /> */}
      {/* <LogoStrip /> */}
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
  console.log(aboutUs);

  const legalDocument = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--legal_document",
      context,
      {
        params: getNodePageJsonApiParams("node--legal_document").getQueryObject(),
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
      legalDocument: validateAndCleanupLegalDocument(legalDocument)
    },
    revalidate: 60,
  };
};
