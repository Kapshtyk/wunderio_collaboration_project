import { HeadingSection as HeadingSectionType } from "@/lib/zod/paragraph";
import { HeadingParagraph } from "./heading--paragraph";

export function ParagraphHeadingSection({
  paragraph,
}: {
  paragraph: HeadingSectionType;
}) {
  return (
    <>
      <div className="h-72 w-[110vw] -translate-x-[25%] rounded-r-2xl bg-gradient-primary-600 bg-right bg-cover bg-no-repeat">
      </div>
      <div className="relative -mt-72 h-72 w-[75vw] mb-4 pt-14 flex flex-col gap-6 z-40 text-white">
        {paragraph.field_heading && (
          <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
        )}
        <p className="text-lg font-regular">{paragraph.field_excerpt}</p>
      </div>
    </ >
  );
}
