import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";

import { ImageSchema } from "./paragraph";

const TestimonialsElementsSchema = z.discriminatedUnion("type", [ImageSchema]);

export const TestimonialsSchema = z.object({
  type: z.literal("node--testimonials"),
  id: z.string(),
  title: z.string(),
  body: z
    .object({
      value: z.string(),
      format: z.string(),
      processed: z.string(),
    })
    .optional()
    .nullable(),
  field_content_elements: z.array(TestimonialsElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupTestimonial(
  testimonials: DrupalNode,
): Testimonial | null {
  try {
    return TestimonialsSchema.parse(testimonials);
  } catch (error) {
    const { name = "ZodError Testimonial", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, testimonials }, null, 2));
    return null;
  }
}

export type Testimonial = z.infer<typeof TestimonialsSchema>;
