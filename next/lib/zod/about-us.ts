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
  TestimonialsSchema,
  VideoSchema,
  WorkCardSchema,
} from "@/lib/zod/paragraph";

const AboutElementsSchema = z.discriminatedUnion("type", [
  FormattedTextSchema,
  ImageSchema,
  VideoSchema,
  LinksSchema,
  AccordionSchema,
  HeroSchema,
  ListingArticlesSchema,
  FileAttachmentsSchema,
  HeadingSectionSchema,
  TestimonialsSchema,
  WorkCardSchema,
]);

export const AboutSchema = z.object({
  type: z.literal("node--about_us"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(AboutElementsSchema),
  path: z.object({
    alias: z.string(),
  }),
  body: z.object({
    value: z.string(),
    format: z.string(),
    processed: z.string(),
  }),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupAbout(about: DrupalNode): About | null {
  try {
    // Validate the top level fields first.
    const topLevelAboutData = AboutSchema.omit({
      field_content_elements: true,
    }).parse(about);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the page contents.
    const validatedParagraphs = about.field_content_elements
      .map((paragraph: any) => {
        const result = AboutElementsSchema.safeParse(paragraph);

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
      ...topLevelAboutData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError About us", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, about }, null, 2));
    return null;
  }
}

export type About = z.infer<typeof AboutSchema>;
