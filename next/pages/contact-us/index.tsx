import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import {
  DrupalNode,
  DrupalTaxonomyTerm,
  DrupalTranslatedPath,
} from "next-drupal";
import { useTranslation } from "next-i18next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { LayoutProps } from "@/components/layout";
import { Paragraph } from "@/components/paragraph";
import { createLanguageLinks } from "@/lib/contexts/language-links-context";
import { drupal } from "@/lib/drupal/drupal-client";
import {
  getNodePageJsonApiParams,
} from "@/lib/drupal/get-node-page-json-api-params";
import { getNodeTranslatedVersions } from "@/lib/drupal/get-node-translated-versions";
import { getCommonPageProps } from "@/lib/get-common-page-props";
import { ContactUs, validateAndCleanupContactUs } from "@/lib/zod/contact-us";
import { OfficeLocations, validateAndCleanupOfficeLocations } from "@/lib/zod/office-locations";
import OfficeLocationsMap from "@/components/office-map";

interface ConatactUsProps extends LayoutProps {
  contactUs: ContactUs;
  maps: OfficeLocations []
}

export default function ContactUsPage({
    contactUs, maps
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const breadcrumbs = [
    {
      title: t("Home"),
      url: "/",
    },
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
        {contactUs.field_content_elements?.map((paragraph) => (
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        ))}
      </div>
      <div>
        <OfficeLocationsMap maps={maps}/>
      </div>
      <div>
        {maps.map((address) => (
            <div>
              {address.field_office_address.split(', ').map((word, index) => (
                <p key={index}>{word}</p>
            ))}
                <p><a href={`mailto:${address.field_office_email}`} className="hyperlink">{address.field_office_email}</a></p>
            </div>
        ))}
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
        params: getNodePageJsonApiParams("node--contact_us")
          .getQueryObject(),
      },
    )
  ).at(0);

  console.log(contactUs);
  
  
  const maps = (
    await drupal.getResourceCollectionFromContext<DrupalNode[]>("node--office_locations",{
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
      contactUs: validateAndCleanupContactUs(contactUs),
      // view,
      maps:maps.map((node) => validateAndCleanupOfficeLocations(node)),
    //   languageLinks,
    },
  };
};
