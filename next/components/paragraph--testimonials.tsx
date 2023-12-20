import { Media } from "@/components/media";
import { Testimonials } from "@/lib/zod/paragraph";

import { FormattedText } from "./formatted-text";

export function ParagraphTestimonials({
  paragraph,
}: {
  paragraph: Testimonials;
}) {
  return (
    <div className="border-l-8 border-primary-600 w-full p-10 my-16">
      <FormattedText html={paragraph.field_testimonial_text.processed} />
      <div className="flex gap-4 items-center h-full w-full">
        <Media
          media={paragraph.field_image}
          className="h-[60px] w-[60px] rounded-full"
          priority={true}
        />
        <span className="text-sm text-secondary-900 items-center w-full">
          {paragraph.field_testimonial_person.processed}
        </span>
      </div>
    </div>
  );
}
