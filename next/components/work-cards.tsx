import Link from "next/link";
import { DrupalTaxonomyTerm } from "next-drupal";
import { useTranslation } from "react-i18next";

import { Page as PageType } from "@/lib/zod/page";
import { WorkCard } from "@/lib/zod/paragraph";

import { MediaImage } from "./media--image";

export function WorkCards({ allWorkPages }) {
  //console.log("allPages", allWorkPages);
  return (
    <div className="grid grid-cols-3 gap-6">
      {allWorkPages
        .map((workPage: PageType) => (
          <div key={workPage.id}>
            {workPage.field_content_elements &&
              workPage.field_content_elements
                .filter(
                  (element) => element.type === "paragraph--work_card",
                )
                .map((paragraph: WorkCard) => (
                  <div key={paragraph.id}>
                    <Link href={workPage.path.alias}>
                      <MediaImage
                        className="rounded-lg h-60 hover:saturate-150"
                        media={paragraph.field_image}
                      />
                      <h3 className="text-primary-600 py-3 font-bold hover:underline">
                        {workPage.title}
                      </h3>
                    </Link>
                    <h1>{paragraph.field_excerpt}</h1>
                    {/* <h1>{workPage.field_excerpt}</h1> */}
                  </div>
                ))}
          </div>
        ))}
    </div>
  );
}
