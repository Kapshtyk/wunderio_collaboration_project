import Link from "next/link";
import { DrupalTaxonomyTerm } from "next-drupal";

import { SubHeadingSection } from "@/lib/zod/paragraph";
import { Services as ServicesType } from "@/lib/zod/services";

import { HeadingPage } from "./heading--page";
import { useRef } from "react";
import useScrollReveal from "@/lib/hooks/scroll-animation";

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

  const revealRef = useRef<HTMLDivElement>(null);
  useScrollReveal(revealRef);

  return (
    <>
      <div
        key={subHeading.id}
      >
        <section id={subHeading.id} ref={revealRef} className="transition-opacity duration-800 ease-in-out">
        <HeadingPage
          title={subHeading.field_heading}
          description={subHeading.field_excerpt}
        />
        </section>
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
