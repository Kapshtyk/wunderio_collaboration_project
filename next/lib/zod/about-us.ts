import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import {
  AccordionSchema,
  FileAttachmentsSchema,
  FormattedTextSchema,
  HeadingSectionSchema,
  HeroSchema,
  ImageSchema,
  LinksSchema,
  ListingArticlesSchema,
  VideoSchema,
} from "@/lib/zod/paragraph";

const AboutUsElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  HeroSchema,
  ListingArticlesSchema,
  FileAttachmentsSchema,
  HeadingSectionSchema
]);

export const AboutUsSchema = z.object({
  type: z.literal("node--about_us"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(AboutUsElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupAboutUs(page: DrupalNode): AboutUs | null {
  try {
    // Validate the top level fields first.
    const topLevelAboutUsData = AboutUsSchema.omit({
      field_content_elements: true,
    }).parse(page);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the page contents.
    const validatedParagraphs = page.field_content_elements
      .map((paragraph: any) => {
        const result = AboutUsElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating page paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelAboutUsData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, page }, null, 2));
    return null;
  }
}

export type AboutUs = z.infer<typeof AboutUsSchema>;
