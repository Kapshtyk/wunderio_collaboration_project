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
import { ContactPerson, validateAndCleanupContactPerson } from "@/lib/zod/contact-person";
import ContactPeople from "@/components/contact-person";
import { FormattedText } from "@/components/formatted-text";

interface ConatactUsProps extends LayoutProps {
  contactUs: ContactUs;
  maps: OfficeLocations[];
  webform: WebformType;
  contactPerson: ContactPerson;
}

export default function ContactUsPage({
  contactUs,
  maps,
  webform,
  contactPerson
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
      <div>
      {contactUs.field_content_elements?.map((paragraph) => {
            return(
                <>
                <div className="justify-center items-center flex flex-col py-10 max-md:px-5">
                {paragraph.type === "paragraph--formatted_text" && (
                    <div className="flex w-full max-w-[1216px] justify-between gap-5 items-start max-md:max-w-full max-md:flex-wrap">
                        <FormattedText key={paragraph.id} html={paragraph.field_formatted_text.processed} />
                    </div>
                    
                )}
                </div>
                </>
        )})}
      </div>
      <section className="items-center flex-col justify-center py-11 max-md:px-5">
        <div className="flex flex-col w-full max-w-[1216px] items-stretch mb-8 max-md:max-w-full">
        <div className="justify-center max-md:max-w-full max-md:pr-5">
        <div className="gap-5 flex max-md:flex max-md:items-stretch max-md:gap-0">
        {maps.map((address) => (
            <div className="flex flex-col items-stretch w-[36%] max-md:w-full max-md:ml-0">
            <div className="items-stretch flex grow flex-col max-md:mt-10">
            <h3 className="text-lg font-bold">{address.title}</h3>
              {address.field_office_address.split(', ').map((word, index) => (
                <p key={index}>{word}</p>
            ))}
            <span className="underline text-primary-500">
            <a href={`mailto:${address.field_office_email}`} className="hyperlink">{address.field_office_email}</a>   
            </span>
            </div>
            </div>
        ))}
        </div>
        </div>
        </div>
      </section>
      <section>
        <ContactPeople contactPerson={contactPerson}/>
     </section> 
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

  const contactPerson = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--contact_persons", {
        params: getNodePageJsonApiParams('node--contact_persons').getQueryObject()
      })
  ).at(0)

  console.log("contact", contactPerson);
  


  //   const languageLinks = createLanguageLinks(nodeTranslations);

  return {
    props: {
      ...(await getCommonPageProps(context)),
      contactUs: validatedResource,
      webform: validatedWebform,
      maps: maps.map((node) => validateAndCleanupOfficeLocations(node)),
      contactPerson: validateAndCleanupContactPerson(contactPerson)
      //   languageLinks,
    },
  };
};
