import Link from "next/link";

import { Page as PageType } from "@/lib/zod/page";
import { WorkCard } from "@/lib/zod/paragraph";

import { MediaImage } from "./media--image";

export function WorkCards({ allWorkPages }) {
  //console.log("allPages", allWorkPages);
  return (
    <div className="w-full md:grid grid-cols-2 gap-6 lg:grid-cols-3">
      {allWorkPages.map((workPage: PageType) => (
        <div key={workPage.id}>
          {workPage.field_content_elements &&
            workPage.field_content_elements
              .filter((element) => element.type === "paragraph--work_card")
              .map((paragraph: WorkCard) => (
                <div key={paragraph.id} className="p-2">
                  <Link href={workPage.path.alias}>
                    <MediaImage
                      className="rounded-lg h-96 hover:saturate-150 w-full"
                      media={paragraph.field_image}
                    />
                    <h1 className="text-primary-600 py-3 text-lg font-bold hover:underline">
                      {workPage.title}
                    </h1>
                  </Link>
                  <p>{workPage.field_excerpt}</p>
                </div>
              ))}
        </div>
      ))}
    </div>
  );
}
