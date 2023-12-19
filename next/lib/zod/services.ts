import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import {
  FormattedTextSchema,
  HeadingSectionSchema,
  LabelledImageSchema,
  SubHeadingSectionSchema,
  TestimonialsSchema,
  VideoSchema,
} from "@/lib/zod/paragraph";

const ServicesElementsSchema = z.discriminatedUnion("type", [
  HeadingSectionSchema,
  FormattedTextSchema,
  TestimonialsSchema,
  SubHeadingSectionSchema,
  LabelledImageSchema,
  VideoSchema,
]);

export const ServicesSchema = z.object({
  type: z.literal("node--services_page"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(ServicesElementsSchema),
  field_page_types: z
    .object({
      name: z.string(),
    })
    .optional(),
  field_service_types: z
    .object({
      name: z.string(),
    })
    .nullable(),
  metatag: MetatagsSchema.optional(),
  path: z.object({
    alias: z.string(),
  }),
});

export function validateAndCleanupServices(
  services: DrupalNode,
): Services | null {
  try {
    // Validate the top level fields first.
    const topLevelServicesData = ServicesSchema.omit({
      field_content_elements: true,
    }).parse(services);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the page contents.
    const validatedParagraphs = services.field_content_elements
      .map((paragraph: any) => {
        const result = ServicesElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating services paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelServicesData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError Services", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, services }, null, 2));
    return null;
  }
}

export type Services = z.infer<typeof ServicesSchema>;
