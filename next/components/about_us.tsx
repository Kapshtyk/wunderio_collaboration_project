import { Paragraph } from "@/components/paragraph";
import { AboutUs } from "@/lib/zod/about-us";

interface AboutUsProps {
  about_us: AboutUs;
}

export default function AboutUs({ about_us }: AboutUsProps) {
  return (
    <div className="grid gap-4">
      {about_us.field_content_elements?.map((paragraph) => (
        <Paragraph key={paragraph.id} paragraph={paragraph} />
      ))}
    </div>
  );
}
