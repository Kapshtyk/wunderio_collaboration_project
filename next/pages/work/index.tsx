import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { DrupalNode, DrupalTaxonomyTerm } from 'next-drupal'
import { useTranslation } from 'next-i18next'

import { ArticleTeasers } from '@/components/article-teasers'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { LayoutProps } from '@/components/layout'
import { LogoStrip } from '@/components/logo-strip'
import { WorkCards } from '@/components/work-card'
import { drupal } from '@/lib/drupal/drupal-client'
import { getNodePageJsonApiParams } from '@/lib/drupal/get-node-page-json-api-params'
import { getCommonPageProps } from '@/lib/get-common-page-props'
import {
  ArticleTeaser,
  validateAndCleanupArticleTeaser
} from '@/lib/zod/article-teaser'
import { Page as PageType, validateAndCleanupPage } from '@/lib/zod/page'
import { HeadingSection } from '@/lib/zod/paragraph'
import { validateAndCleanupWork, Work } from '@/lib/zod/work'

interface WorkPageProps extends LayoutProps {
  mainPage: Work
  allPages: PageType[]
  tags: DrupalTaxonomyTerm[]
  promotedArticleTeasers: ArticleTeaser[]
}

export default function WorkPage({
  mainPage,
  allPages,
  tags,
  promotedArticleTeasers
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const breadcrumbs = [
    {
      title: 'Home',
      url: '/'
    },
    {
      title: 'Work',
      url: '/work'
    }
  ]
  console.log('workPages:', allPages)

  const headingSection = mainPage.field_content_elements.find(
    (element) => element.type === 'paragraph--heading_section'
  ) as HeadingSection

  return (
    <>
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <div className="h-70 bg-primary-400/40">
        <div className="p-20 flex">
          <h1 className="font-bold text-2xl mr-20">
            {headingSection.field_heading}
          </h1>
          <span className="text-lg">{headingSection.field_excerpt}</span>
        </div>
      </div>

      <div>
        {tags.map((tag) => (
          <div className="grid grid-cols-3 gap-3" key={tag.id}>
            {allPages
              .filter(
                (workPages) => workPages.field_page_type?.name === tag.name
              )
              .map((workPage) => (
                <div key={workPage.id}>
                  <WorkCards
                    title={workPage.title}
                    contentElements={workPage.field_content_elements}
                    path={workPage.path.alias}
                  />
                </div>
              ))}
          </div>
        ))}
      </div>

      <LogoStrip />
      <ArticleTeasers
        articles={promotedArticleTeasers}
        heading={'promoted-articles'}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<WorkPageProps> = async (
  context
) => {
  const mainPage = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      'node--work',
      context,
      {
        params: getNodePageJsonApiParams('node--work').getQueryObject()
      }
    )
  ).at(0)

  console.log('mainPage:' + mainPage)

  const pages = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--page',
    context,
    {
      params: getNodePageJsonApiParams('node--page').getQueryObject()
    }
  )

  const tags = await drupal.getResourceCollectionFromContext<
    DrupalTaxonomyTerm[]
  >('taxonomy_term--page_type', context, {})
  console.log('tags: ', tags)

  const promotedArticleTeasers = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >('node--article', context, {
    params: {
      'filter[status]': 1,
      'filter[langcode]': context.locale,
      'filter[promote]': 1,
      'fields[node--article]': 'title,path,field_image,uid,created',
      include: 'field_image,uid',
      sort: '-sticky,-created',
      'page[limit]': 3
    }
  })

  return {
    props: {
      ...(await getCommonPageProps(context)),
      mainPage: validateAndCleanupWork(mainPage),
      allPages: pages.map((node) => validateAndCleanupPage(node)),
      tags,
      promotedArticleTeasers: promotedArticleTeasers.map((teaser) =>
        validateAndCleanupArticleTeaser(teaser)
      )
    }
  }
}
