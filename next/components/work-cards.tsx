import Link from "next/link";

import { Page as PageType } from "@/lib/zod/page";
import { WorkCard } from "@/lib/zod/paragraph";

import { MediaImage } from "./media--image";

export function WorkCards({ allWorkPages }) {
  return (
    <div className="w-full md:grid grid-cols-2 gap-4 lg:grid-cols-3 ">
      {allWorkPages.map((workPage: PageType) => (
        <div key={workPage.id}>
          {workPage.field_content_elements &&
            workPage.field_content_elements
              .filter((element) => element.type === "paragraph--work_card")
              .map((paragraph: WorkCard) => (
                <div key={paragraph.id} className="h-[auto] mb-[0.5rem]">
                  <Link href={workPage.path.alias}>
                    <div className=" h-[300px] transition-transform duration-300 ease-in-out transform hover:scale-105 animate-fadeIn">
                      <MediaImage
                        className="rounded-lg h-full hover:saturate-150 w-full"
                        media={paragraph.field_image}
                      />
                    </div>
                    <h1 className="text-main py-3 text-lg font-bold hover:underline">
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
