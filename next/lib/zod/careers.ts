import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import {
  TestimonialsSchema,
  HeadingSectionSchema,
  FormattedTextSchema,
} from "@/lib/zod/paragraph";

const CareersElementsSchema = z.discriminatedUnion("type", [
  TestimonialsSchema,
  HeadingSectionSchema,
  FormattedTextSchema,
]);

export const CareersSchema = z.object({
  type: z.literal("node--careers"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(CareersElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupCareers(careers: DrupalNode): Careers | null {
  try {
    // Validate the top level fields first.
    const topLevelCareersData = CareersSchema.omit({
      field_content_elements: true,
    }).parse(careers);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the page contents.
    const validatedParagraphs = careers.field_content_elements
      .map((paragraph: any) => {
        const result = CareersElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating careers paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelCareersData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, careers }, null, 2));
    return null;
  }
}

export type Careers = z.infer<typeof CareersSchema>;
