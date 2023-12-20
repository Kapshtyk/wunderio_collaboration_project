import Link from "next/link";

import { Paragraph, WorkCard } from "@/lib/zod/paragraph";

import { MediaImage } from "./media--image";

export function WorkWorkCard({ workPage }) {
  return (
    <div
      key={workPage.id}
      className="block w-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mb-12"
    >
      {workPage.field_content_elements
        .filter((element: Paragraph) => element.type === "paragraph--work_card")
        .map((paragraph: WorkCard) => (
          <div
            key={paragraph.id}
            className="relative overflow-hidden bg-cover bg-no-repeat h-64"
          >
            <Link href={workPage.path.alias}>
              <MediaImage
                className="rounded-sm hover:saturate-150 w-full h-full"
                media={paragraph.field_image}
              />
            </Link>
          </div>
        ))}

      <div className="px-6 py-4">
        <Link href="/work">
          <span className="text-accent-hugs text-md hover:underline uppercase">
            {workPage.field_page_type.name}
          </span>
        </Link>
      </div>

      <Link href={workPage.path.alias}>
        <div className="px-6 py-4">
          <h1 className="text-main font-bold hover:underline">
            {workPage.title}
          </h1>
        </div>
      </Link>
    </div>
  );
}
