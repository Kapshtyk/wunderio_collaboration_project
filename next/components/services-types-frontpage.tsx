import Link from "next/link";
import { useTranslation } from "next-i18next";

import { SubHeadingSection } from "@/lib/zod/paragraph";
import { Services as ServicesType } from "@/lib/zod/services";
import AdvisoryIcon from "@/styles/icons/advisory.svg";
import DeliveringDigitalIcon from "@/styles/icons/delivering-digital.svg";
import DesignDataIcon from "@/styles/icons/design-data.svg";

interface ServicesTypesProps {
  servicesTypes: ServicesType[];
  allServices: ServicesType;
}

const ServicesFrontPage = ({
  servicesTypes,
  allServices,
}: ServicesTypesProps) => {
  const { t } = useTranslation();
  const subHeadingSections = allServices.field_content_elements.filter(
    (field) => field.type === "paragraph--sub_heading_section",
  ) as SubHeadingSection[];
  return (
    <>
      <section className="items-center section-magrin flex flex-col justify-center px-16 py-12 max-md:px-5">
        <div className="flex w-full max-w-[1216px] flex-col items-stretch my-8 max-md:max-w-full">
          <h2 className="text-center">{t("this-is-what-we-do")}</h2>
          <div className="mt-16 max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              {subHeadingSections.map((subHeadingSection) => (
                <div
                  key={subHeadingSection.id}
                  className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0 transition-transform duration-300 ease-in-out transform hover:scale-105 animate-fadeIn"
                >
                  <div className="items-stretch self-stretch bg-white flex w-full grow flex-col mx-auto pt-6 pb-12 px-6 rounded-lg max-md:mt-8 max-md:px-5">
                    <div className="flex items-center self-stretch gap-4">
                      {subHeadingSection.field_heading === "Advisory" ||
                      subHeadingSection.field_heading === "Neuvonta" ||
                      subHeadingSection.field_heading === "Rådgivande" ? (
                        <AdvisoryIcon className="h-10 w-10 motion-safe:animate-spin" />
                      ) : subHeadingSection.field_heading === "Design & Data" ||
                        subHeadingSection.field_heading ===
                          "Suunnittelu ja tiedot" ||
                        subHeadingSection.field_heading ===
                          "Design och data" ? (
                        <DesignDataIcon className="h-10 w-10 motion-safe:animate-spin" />
                      ) : subHeadingSection.field_heading ===
                          "Delivering Digital" ||
                        subHeadingSection.field_heading ===
                          "Digitaalinen toimitus" ||
                        subHeadingSection.field_heading ===
                          "Att leverera digitalt" ? (
                        <DeliveringDigitalIcon className="h-10 w-10 motion-safe:animate-spin" />
                      ) : null}
                      <span className="text-accent-hugs uppercase">
                        {subHeadingSection.field_heading}
                      </span>
                    </div>
                    <div className="bg-background shrink-0 h-px mt-6" />
                    <p className="mt-6 mb-6 text-steelgray">
                      {subHeadingSection.field_excerpt}
                    </p>
                    {servicesTypes
                      .filter(
                        (field) =>
                          field.field_service_types?.name ===
                          subHeadingSection.field_heading,
                      )
                      .map((service) => (
                        <div key={service.id} className="mt-2">
                          <Link
                            href={service.path.alias}
                            className="text-primary-700 hover:underline"
                          >
                            {service.title}
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesFrontPage;
