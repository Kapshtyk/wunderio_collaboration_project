import { Paragraph } from "@/components/paragraph";
import { About } from "@/lib/zod/about-us";

import { FormattedText } from "./formatted-text";

interface AboutUsProps {
  about_us: About;
}

export default function AboutUs({ about_us }: AboutUsProps) {
  return (
    <div className="grid gap-4">
      {about_us.field_content_elements.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
      <section className="section-margin lg:w-[80vw]">
        <FormattedText html={about_us.body.processed} />
      </section>
    </div>
  );
}
