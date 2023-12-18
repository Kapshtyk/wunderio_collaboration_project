import { HeadingSection as HeadingSectionType } from "@/lib/zod/paragraph";

import { HeadingParagraph } from "./heading--paragraph";

export function ParagraphHeadingSection({
  paragraph,
}: {
  paragraph: HeadingSectionType;
}) {
  return (
    <>
      <div className="bg-gradient-primary-600 py-4 2sm:py-6 md:py-8 lg:py-10 xl:py-12 min-h-[280px] w-[110vw] -translate-x-[25%] rounded-r-2xl  flex flex-col align-middle justify-center my-4">
        <div className="w-[70vw] ml-[25%]">
          {paragraph.field_heading && (
            <HeadingParagraph className="text-white">
              {paragraph.field_heading}
            </HeadingParagraph>
          )}
          <p className="text-white">{paragraph.field_excerpt}</p>
        </div>
      </div>
    </>
  );
}
