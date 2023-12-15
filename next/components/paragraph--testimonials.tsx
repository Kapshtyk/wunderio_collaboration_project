import { Media } from "@/components/media";
import { Testimonials } from "@/lib/zod/paragraph";

import { FormattedText } from "./formatted-text";

export function ParagraphTestimonials({
  paragraph,
}: {
  paragraph: Testimonials;
}) {
  return (
    // <div className="border-l-2 max-w-xs border-graysuit p-2 pl-4 flex gap-2 justify-between">
    //   <div className="rounded-full w-50 h-50 overflow-hidden">
    //     <Media media={paragraph.field_image} priority={true} />
    //   </div>
    //   <div className="flex flex-col justify-between text-right">
    //     <span className="text-graysuit text-sm">
    //       {paragraph.field_testimonial_person.processed}
    //     </span>
    //     <FormattedText html={paragraph.field_testimonial_text.processed} />
    //   </div>
    // </div>

    <div className="border-l-8 border-primary-600 w-full p-10 my-16">
      <FormattedText html={paragraph.field_testimonial_text.processed} />
      <div className="flex gap-4 items-center h-full w-full">

        <Media className="h-[70px] w-[70px] rounded-full" media={paragraph.field_image} priority={true} />
        <span className="text-sm text-secondary-900 items-center w-full">
          {paragraph.field_testimonial_person.processed}
        </span>
      </div>
    </div>
  );
}
