import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { DrupalNode, DrupalTranslatedPath } from 'next-drupal';
import { useTranslation } from 'next-i18next';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { HeadingPage } from '@/components/heading--page';
import { LayoutProps } from '@/components/layout';
import { createLanguageLinksForNextOnlyPage } from '@/lib/contexts/language-links-context';
import { drupal } from '@/lib/drupal/drupal-client';
import { ResourceType, getNodePageJsonApiParams } from '@/lib/drupal/get-node-page-json-api-params';
import { getCommonPageProps } from '@/lib/get-common-page-props';
import { About as AboutType, validateAndCleanupAbout } from '@/lib/zod/about-us';
import AboutUs from '@/components/about_us';
import { Numbers as NumbersType, validateAndCleanupNumbers } from "@/lib/zod/numbers";
import Numbers from "@/components/numbers";
import { LogoSingle } from '@/components/logowall-single';
import { LogoWall as LogoType, validateAndCleanupLogoWall } from "@/lib/zod/logowall"

interface AboutPageProps extends LayoutProps {
  aboutPage: AboutType;
  wunderNumbers: NumbersType[];
  logoWall: LogoType[];
}

export default function AboutPage({
  aboutPage,
  wunderNumbers,
  logoWall,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t('about-link'),
      url: '/about',
    },
  ];

  return (
    <>
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <AboutUs about_us={aboutPage} />
      <div className="text-center">
        <div className="my-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {logoWall.map((logo) => (
            <LogoSingle key={logo.title} logo={logo} />
          ))}
        </div>
      </div>
      <div>
        <Numbers numbers={wunderNumbers} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async (context) => {
  const aboutPage = (await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--about_us',
    context,
    {
      params: getNodePageJsonApiParams('node--about_us').getQueryObject(),
    }
  )).at(0);

  const logoWall = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--logowall',
    context,
    {
      params: getNodePageJsonApiParams('node--logowall').getQueryObject(),
    }
  );

  console.log(logoWall[0])


  const numbers = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    'node--numbers',
    context,
    {
      params: getNodePageJsonApiParams('node--numbers')
        .addFilter('field_numbers_type.name', 'Wunder in Numbers')
        .getQueryObject(),
    }
  );

  return {
    props: {
      ...(await getCommonPageProps(context)),
      aboutPage: validateAndCleanupAbout(aboutPage),
      wunderNumbers: numbers.map((node) => validateAndCleanupNumbers(node)),
      logoWall: logoWall.map((node) => validateAndCleanupLogoWall(node)),
    },
    revalidate: 60,
  };
};
