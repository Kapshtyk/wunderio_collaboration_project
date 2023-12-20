import Link from "next/link";
import { DrupalTaxonomyTerm } from "next-drupal";
import { useRef } from "react";

import { useIsVisible } from "@/lib/hooks/scroll-animation";
import { SubHeadingSection } from "@/lib/zod/paragraph";
import { Services as ServicesType } from "@/lib/zod/services";

import { HeadingPage } from "./heading--page";
import { HeadingParagraph } from "./heading--paragraph";
/* import { HeadingParagraph } from "./heading--paragraph";
 */
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
      <div
        key={subHeading.id}
        ref={ref}
        className={`fadeInOut ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <section id={subHeading.id}>
        <HeadingPage
          title={subHeading.field_heading}
          description={subHeading.field_excerpt}
        />
        </section>
        {/* <section
          className="flex flex-col w-[1440px] items-start gap-[10px] px-0 py-[47px] relative"
          id={subHeading.id}
        >
          <div className="inline-flex flex-col items-start gap-[10px] relative flex-[0_0_auto]">
            <div className="relative w-[1328px] h-[279px] bg-gradient-primary-600 bg-right bg-cover bg-no-repeat rounded-lg">
            <div className="flex flex-col w-[1007px] items-start gap-[20px] absolute top-[58px] left-[199px] text-white">
            <div className="inline-flex flex-col items-start gap-[24px] relative flex-[0_0_auto]">
            <h2 className="text-white">{subHeading.field_heading}</h2>
            <p className="text-white">{subHeading.field_excerpt}</p>
            </div>
          </div>
          </div>
          </div>
        </section> */}
  <section className="w-full flex flex-col">
  {tags
    .filter((tag) => tag.name === subHeading.field_heading)
    .map((tag) => (
      <div
        key={tag.id}
        className="flex flex-col w-full gap-4 pl-4 pr-4 pt-4 pb-2 relative sm:pl-8 sm:pr-6 sm:pt-6 sm:pb-2 md:pl-12 md:pr-8 md:pt-8 md:pb-2 lg:pl-16 lg:pr-12 lg:pt-12 lg:pb-2 xl:pl-20 xl:pr-16 xl:pt-16 xl:pb-2"
      >
        <div className="gap-2 inline-flex flex-col items-start relative flex-shrink-0">
          <span
            key={tag.name}
            className="text-xs font-bold text-accent-color pr-1 inline-block uppercase"
          >
            {tag.name}
          </span>
        </div>
        {services
          .filter(
            (service) => service.field_service_types?.name === tag.name,
          )
          .map((service) => (
            <div
              key={service.id}
              className="gap-2 inline-flex flex-col items-start relative flex-shrink-0"
            >
              <Link
                key={service.id}
                href={service.path.alias}
                className="font-bold text-primary-500 text-lg tracking-tight leading-6 underline whitespace-nowrap"
              >
                {service.title}
              </Link>
              {service.field_content_elements?.map((item) => {
                if (
                  "field_heading" in item &&
                  "field_excerpt" in item
                ) {
                  if (item.type === "paragraph--heading_section") {
                    return (
                      <p key={item.id}>{item.field_excerpt}</p>
                    );
                  }
                }
                return null;
              })}
            </div>
          ))}
      </div>
    ))}
</section>

      </div>
    </>
  );
};

export default SubHeadingSectionComponent;
