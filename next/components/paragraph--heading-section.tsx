import { HeadingSection as HeadingSectionType } from "@/lib/zod/paragraph";

import { HeadingParagraph } from "./heading--paragraph";

export function ParagraphHeadingSection({
  paragraph,
}: {
  paragraph: HeadingSectionType;
}) {
  return (
    <>
      <div className="relative h-64 bg-gradient-to-r from-primary-600 to-primary-600">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/public/a5b97f1ed23d0bc08a59a8be0e3a1290.jpeg')" }}></div>
      </div>

      <div className="w-[1328px] h-[280px] gradien">
        {paragraph.field_heading && (
          <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
        )}
        <p>{paragraph.field_excerpt}</p>
      </div>
    </>
  );
}
