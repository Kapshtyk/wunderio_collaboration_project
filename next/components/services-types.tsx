import Link from "next/link";

import { SubHeadingSection } from "@/lib/zod/paragraph";
import { Services as ServicesType } from "@/lib/zod/services";

interface ServicesTypesProps {
  servicesTypes: ServicesType[];
  allServices: ServicesType;
}

const ServicesTypes = ({ servicesTypes, allServices }: ServicesTypesProps) => {
  const subHeadingSections = allServices.field_content_elements.filter(
    (field) => field.type === "paragraph--sub_heading_section",
  ) as SubHeadingSection[];
  return (
    <>
      <section className="justify-center items-center flex flex-col pt-10 pb-2.5 max-md:px-5">
        <div className="w-full max-w-[1216px] max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            {subHeadingSections.map((subHeadingSection) => (
              <div
                key={subHeadingSection.id}
                className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0"
              >
                <div className="items-stretch self-stretch flex flex-col max-md:mt-8">
                  <p className="underline underline--small text-accent-hugs font-semibold">
                    {subHeadingSection.field_heading.toLocaleUpperCase()}
                  </p>
                  <p>{subHeadingSection.field_excerpt}</p>
                  {servicesTypes
                    .filter(
                      (field) =>
                        field.field_service_types?.name ===
                        subHeadingSection.field_heading,
                    )
                    .map((service) => (
                      <div key={service.id}>
                        <Link
                          href={service.path.alias}
                          className="text-main hover:underline"
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
      </section>
    </>
  );
};

export default ServicesTypes;
