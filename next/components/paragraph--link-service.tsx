import Link from "next/link";

import { LinkService as LinkServiceType } from "@/lib/zod/paragraph";

export function ParagraphLinkService({
  paragraph,
}: {
  paragraph: LinkServiceType;
}) {
  const heading = paragraph.field_heading;
  console.log("heading", heading);

  return (
    <>
      <Link href={paragraph.field_target_link} className="text-primary-700">
        {paragraph.field_heading}
      </Link>
      <p>{paragraph.field_excerpt}</p>
    </>
  );
}
