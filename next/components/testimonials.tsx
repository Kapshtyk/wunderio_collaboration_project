import React from "react";

import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media--image";
import { Testimonial } from "@/lib/zod/testimonials";
import Icon from "@/styles/icons/quotes.svg";

interface TestimonialsProps {
  testimonials: Testimonial[];
  title: string;
  description: string;
}

const Testimonials = ({
  testimonials,
  title,
  description,
}: TestimonialsProps) => {
  const currentTestimonial = React.useState(0)[0];

  return (
    <section className="w-full grid grid-cols-2 min-h-[400px]">
      <div className="col-span-1 bg-primary-500 text-white px-20 gap-2 flex flex-col justify-center h-full">
        <h2 className="text-heading-lg font-bold">{title}</h2>
        <p className="text-lg font-regular">{description}</p>
      </div>
      <div className="p-10 ">
        <div className="relative pt-24 flex flex-col gap-6">
          <Icon className="absolute top-0 right-0 w-[80px] h-[65px] text-main/80" />
          <div className="flex items-center">
            {testimonials[currentTestimonial].field_content_elements?.map(
              (paragraph) => {
                if (paragraph.type === "paragraph--image") {
                  return (
                    <div
                      className="rounded-full h-14 w-14 overflow-hidden mr-4"
                      key={paragraph.id}
                    >
                      <MediaImage media={paragraph.field_image} />
                    </div>
                  );
                }
              },
            )}
            <span className="text-lg font-bold">
              {testimonials[currentTestimonial].title}
            </span>
          </div>
          <div className="body-lg font-regular">
            <FormattedText
              html={testimonials[currentTestimonial].body.processed}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
