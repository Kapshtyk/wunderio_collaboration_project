import { GetStaticProps, InferGetStaticPropsType } from "next";
import { DrupalNode } from "next-drupal";
import { useTranslation } from "next-i18next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { LayoutProps } from "@/components/layout";
import OfficeLocationsMap from "@/components/office-map";
import { Paragraph } from "@/components/paragraph";
import { Webform } from "@/components/webworm/webform";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { drupal } from "@/lib/drupal/drupal-client";
import { getNodePageJsonApiParams } from "@/lib/drupal/get-node-page-json-api-params";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { ContactUs, validateAndCleanupContactUs } from "@/lib/zod/contact-us";
import {
  OfficeLocations,
  validateAndCleanupOfficeLocations,
} from "@/lib/zod/office-locations";
import {
  validateAndCleanupWebform,
  validateAndCleanupWebformFields,
  Webform as WebformType,
} from "@/lib/zod/webform";

interface ConatactUsProps extends LayoutProps {
  contactUs: ContactUs;
  maps: OfficeLocations[];
  webform: WebformType;
}

export default function ContactUsPage({
  contactUs,
  maps,
  webform,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("Contact Us"),
      url: "/contact-us",
    },
  ];

  return (
    <>
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <div className="grid gap-4">
        {contactUs.field_content_elements?.map((paragraph) => {
            return(
                <>
                {paragraph.type === "paragraph--heading_section" && (
                    <Paragraph key={paragraph.id} paragraph={paragraph} />
                )}
                </>
        )})}
      </div>
      <div>
        <OfficeLocationsMap maps={maps} />
        <Webform
          formTitle={t("form-contact-title")}
          webform={webform}
          variant="contact"
          maps={maps}
        />
      </div>
      <div className="container">
        <div className="flex gap-36">
        {maps.map((address) => (
            <div className="w-60 bg-accent-peach-fuzz">
            <h3>{address.title}</h3>
              {address.field_office_address.split(', ').map((word, index) => (
                <p key={index}>{word}</p>
            ))}
            <div>
            <a href={`mailto:${address.field_office_email}`} className="hyperlink">{address.field_office_email}</a>
            </div>
            
            </div>
        ))}
        </div>
      </div> 
      <div>
      {contactUs.field_content_elements?.map((paragraph) => {
            return(
                <>
                <div className="flex gap-80">
                {paragraph.type === "paragraph--formatted_text" && (
                    <Paragraph key={paragraph.id} paragraph={paragraph} />
                )}
                </div>
            
                </>
        )})}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<ConatactUsProps> = async (
  context,
) => {
  const contactUs = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--contact_us",
      context,
      {
        params: getNodePageJsonApiParams("node--contact_us").getQueryObject(),
      },
    )
  ).at(0);

//   console.log('contactUs:', contactUs);

  const validatedResource = await validateAndCleanupContactUs(contactUs);

  const validatedWebform = validateAndCleanupWebform(
    contactUs.field_contact_us_form,
  );

  const webformFields = await fetch(
    absoluteUrl(
      `/webform_rest/${validatedResource.field_contact_us_form.resourceIdObjMeta.drupal_internal__target_id}/fields?_format=json`,
    ),
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  const validatedWebformFields = validateAndCleanupWebformFields(webformFields);

  validatedWebform.field_webform_fields = validatedWebformFields;


  const maps = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--office_locations", {
      params: getNodePageJsonApiParams('node--office_locations').getQueryObject()
    })
  )



  // console.log('maps:',maps);

  //   const view = (
  //     await drupal.getView("office_address_marker--block_1",{
  //       params:{
  //         fields:{
  //           "node--office_locations": "title,field_office_address,field_address"
  //         }
  //       }
  //     })
  //   )

  // console.log("view:", view);

  //   const nodeTranslations = await getNodeTranslatedVersions(
  //     contactPage,
  //     context,
  //     drupal,
  //   );

  //   const languageLinks = createLanguageLinks(nodeTranslations);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      contactUs: validatedResource,
      webform: validatedWebform,
      // view,
      maps: maps.map((node) => validateAndCleanupOfficeLocations(node)),
      //   languageLinks,
    },
  };
};
