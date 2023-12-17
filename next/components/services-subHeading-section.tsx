import Link from "next/link";
import { DrupalTaxonomyTerm } from "next-drupal";

import { SubHeadingSection } from "@/lib/zod/paragraph";
import { Services as ServicesType } from "@/lib/zod/services";
import { HeadingParagraph } from "./heading--paragraph";
import { useRef } from "react";
import { useIsVisible } from "@/lib/hooks/scroll-animation";

interface SubHeadingSectionProps {
  subHeading: SubHeadingSection;
  tags: DrupalTaxonomyTerm[];
  services: ServicesType[];
}

const SubHeadingSectionComponent = ({
  subHeading,
  tags,
  services,
}: SubHeadingSectionProps) => {
  console.log("services:", services);

  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(ref);


  return (
    <>
      <div key={subHeading.id} ref={ref} className={`fadeInOut ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <section
          className="flex flex-col w-[1440px] items-start gap-[10px] px-0 py-[47px] relative"
          id={subHeading.id}
        >
          <div className="inline-flex flex-col items-start gap-[10px] relative flex-[0_0_auto]">
            <div className="relative w-[1328px] h-[279px] bg-gradient-primary-600 bg-right bg-cover bg-no-repeat rounded-lg">
            <div className="flex flex-col w-[1007px] items-start gap-[20px] absolute top-[58px] left-[199px] text-white">
            <div className="inline-flex flex-col items-start gap-[24px] relative flex-[0_0_auto]">
            <h2 className="text-white text-heading-lg font-semibold">{subHeading.field_heading}</h2>
            <p>{subHeading.field_excerpt}</p>
            </div>
          </div>
          </div>
          </div>
        </section>
        <section className="w-[1440px] flex flex-col">
        {tags
          .filter((tag) => tag.name === subHeading.field_heading)
          .map((tag) => (
           <>
           <div key={tag.id} className="flex flex-col w-[1440px] gap-[10px] pl-[112px] pr-[80px] pt-[40px] pb-[10px] relative">
              <div className="gap-[24px] inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div>
              <h2 className="relative w-fit mt-[-1.00px] font-semibold">{tag.name.toUpperCase()}</h2>
              </div>
              {services
                .filter(
                  (service) => service.field_service_types?.name === tag.name,
                )
                .map((service) => (
                  <div key={service.id} className="gap-[8px] inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <Link
                      key={service.id}
                      href={service.path.alias}
                      className="font-bold text-primary-500 text-[24px] tracking-[0] leading-[32px] underline whitespace-nowrap"
                    >
                      {service.title}
                    </Link>
                    {service.field_content_elements?.map((item) => {
                      if ("field_heading" in item && "field_excerpt" in item) {
                        if (item.type === "paragraph--heading_section") {
                          return <p key={item.id}>{item.field_excerpt}</p>;
                        }
                      }
                      return null;
                    })}
                  </div>
                ))}
                </div>
                </div>
            </>
          ))}
          </section>
      </div>  
    </>
  );
};

export default SubHeadingSectionComponent;
