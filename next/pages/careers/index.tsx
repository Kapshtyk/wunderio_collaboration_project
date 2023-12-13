import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { LayoutProps } from "@/components/layout";
import OpenPositions from "@/components/open-positions";
import { Paragraph } from "@/components/paragraph";
import { createLanguageLinks } from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { Careers, validateAndCleanupCareers } from "@/lib/zod/careers";
import {
  OpenPositions as OpenPositionsType,
  validateAndCleanupOpenPositions,
} from "@/lib/zod/open-positions";
import { FormattedText } from "@/components/formatted-text";
import Testimonials from "@/components/testimonials";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { Webform as WebformType, validateAndCleanupWebform, validateAndCleanupWebformFields } from "@/lib/zod/webform";
import { Webform } from "@/components/webworm/webform";

interface CareersPageProps extends LayoutProps {
  careers: Careers;
  openPositions: OpenPositionsType[];
  webform: WebformType;
}

export default function CareersPage({
  careers,
  openPositions,
  webform,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("careers-link"),
      url: "/careers",
    },
  ];


  return (
    <>
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <div className="grid gap-4">
        {careers.field_content_elements?.map((paragraph) => (
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        ))}
      </div>
      <FormattedText html={careers.body.processed} />
      {careers.field_testimonials?.length ? (<Testimonials testimonials={careers.field_testimonials} title={"Happy employees"} description={"Feedback from our happy employees helps us to improve our work and services."} />) : null}
      {webform && <Webform formTitle={t('form-careers-title')} webform={webform} />}
      <OpenPositions openPositions={openPositions} />
    </>
  );
}

export const getStaticProps: GetStaticProps<CareersPageProps> = async (
  context,
) => {
  const careers = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--careers",
      context,
      {
        params: getNodePageJsonApiParams("node--careers").getQueryObject(),
      },
    )
  ).at(0);

  const validatedResource = await validateAndCleanupCareers(careers);

  const nodeTranslations = await getNodeTranslatedVersions(
    careers,
    context,
    drupal,
  );

  const validatedWebform = validateAndCleanupWebform(careers.field_careers_newsletter);

  const webformFields = await fetch(
    absoluteUrl(
      `/webform_rest/${validatedResource.field_careers_newsletter.resourceIdObjMeta.drupal_internal__target_id}/fields?_format=json`,
    ),
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  const validatedWebformFields =
    validateAndCleanupWebformFields(webformFields);

  validatedWebform.field_webform_fields = validatedWebformFields;

  const languageLinks = createLanguageLinks(nodeTranslations);

  const openPositions = await drupal.getResourceCollectionFromContext<
    DrupalNode[]
  >("node--open_positions", context, {
    params: getNodePageJsonApiParams("node--open_positions").getQueryObject(),
  });

  return {
    props: {
      ...(await getCommonPageProps(context)),
      careers: validatedResource,
      openPositions: openPositions.map((node) =>
        validateAndCleanupOpenPositions(node),
      ),
      webform: validatedWebform,
      languageLinks,
    },
    revalidate: 60,
  };
};
