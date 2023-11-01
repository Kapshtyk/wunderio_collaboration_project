import { Media } from "@/components/media";
import { Testimonials } from "@/lib/zod/paragraph";
import { FormattedText } from "./formatted-text";

export function ParagraphTestimonials({ paragraph }: { paragraph: Testimonials }) {
  return (
    <div className="border-l-2 border-graysuit p-2 pl-4">
      <span className="text-graysuit text-sm">
        {paragraph.field_testimonial_person[0].processed}
      </span>
      <FormattedText html={paragraph.field_testimonial_text[0].processed} />

      < Media media={paragraph.field_image} priority={true} />
    </div>
  )
}
