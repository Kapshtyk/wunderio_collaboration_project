import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import {
  HeadingSectionSchema,
  FormattedTextSchema
} from "@/lib/zod/paragraph";

const ContactUsElementsSchema = z.discriminatedUnion("type", [
  HeadingSectionSchema,
  FormattedTextSchema
]);

export const ContactUsSchema = z.object({
  type: z.literal("node--contact_us"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(ContactUsElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupContactUs(
  contactUs: DrupalNode,
): ContactUs | null {
  try {
    const topLevelServicesData = ContactUsSchema.omit({
      field_content_elements: true,
    }).parse(contactUs);

    const validatedParagraphs = contactUs.field_content_elements
      .map((paragraph: any) => {
        const result = ContactUsElementsSchema.safeParse(paragraph);

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
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, contactUs }, null, 2));
    return null;
  }
}

export type ContactUs = z.infer<typeof ContactUsSchema>;
