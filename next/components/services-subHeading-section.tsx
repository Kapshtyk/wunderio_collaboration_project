import { SubHeadingSection } from "@/lib/zod/paragraph";
import { DrupalTaxonomyTerm } from "next-drupal";
import Link from "next/link";
import { Services as ServicesType } from "@/lib/zod/services";

interface SubHeadingSectionProps {
  subHeading: SubHeadingSection;
  tags: DrupalTaxonomyTerm[];
  services: ServicesType[];
}

const SubHeadingSectionComponent = ({subHeading,tags,services}: SubHeadingSectionProps) => {
console.log("services:", services);

  return (
    <>
    <div key={subHeading.id}>
      <div className="flex h-[100px] bg-primary-400/40 justify-between" id={subHeading.id}>
        <h1>{subHeading.field_heading}</h1>
        <span>{subHeading.field_excerpt}</span>
      </div>
      {tags
        .filter((tag) => tag.name === subHeading.field_heading)
        .map((tag) => (
          <div key={tag.id}>
            <h2>{tag.name}</h2>
            {services
              .filter((service) => service.field_service_types?.name === tag.name)
              .map((service) => (
                <div key={service.id}>
                  <Link key={service.id} href={service.path.alias} className="text-primary-600">
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
        ))}
    </div>
    </>
  )

}

  

export default SubHeadingSectionComponent;
