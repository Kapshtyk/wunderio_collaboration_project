import Link from "next/link";
import { useTranslation } from "next-i18next";

import { Paragraph, WorkCard } from "@/lib/zod/paragraph";

import { MediaImage } from "./media--image";

export function WorkWorkCard({ workPage }) {
  const { t } = useTranslation();
  return (
    <div
      key={workPage.id}
      className="block w-full rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mb-6"
    >
      {workPage.field_content_elements
        .filter((element: Paragraph) => element.type === "paragraph--work_card")
        .map((paragraph: WorkCard) => (
          <div
            key={paragraph.id}
            className="relative overflow-hidden object-cover bg-no-repeat h-64 p-2"
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
          <span className="uppercase text-accent-hugs text-md hover:underline">
            {/* {workPage.field_page_type.name} */} {t("related-content-work")}
          </span>
        </Link>
      </div>

      <Link href={workPage.path.alias}>
        <div className="px-6 py-4">
          <h1 className="text-primary-500 font-bold hover:underline">
            {workPage.title}
          </h1>
        </div>
      </Link>
    </div>
  );
}
