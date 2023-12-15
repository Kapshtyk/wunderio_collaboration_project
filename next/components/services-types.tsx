import Link from "next/link";

import { SubHeadingSection } from "@/lib/zod/paragraph";
import { Services as ServicesType } from "@/lib/zod/services";

interface ServicesTypesProps {
  servicesTypes: ServicesType[];
  allServices: ServicesType;
}

const ServicesTypes = ({ servicesTypes, allServices }: ServicesTypesProps) => {
  // console.log("all services:", allServices);
  // console.log("services:", servicesTypes);
  const subHeadingSections = allServices.field_content_elements.filter(
    (field) => field.type === "paragraph--sub_heading_section",
  ) as SubHeadingSection[];
  return (
    <>
      <div className="flex">
        {subHeadingSections.map((subHeadingSection) => (
          <div key={subHeadingSection.id}>
            {
              <div className="col-12 col-md-6 col-lg-4">
                <p className="underline underline--small text-secondary-900">
                  {subHeadingSection.field_heading}</p>
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
                        className="text-primary-600"
                      >
                        {service.title}
                      </Link>
                    </div>
                  ))}
              </div>
            }
          </div>
        ))}
      </div>
    </>
  );
};

export default ServicesTypes;
