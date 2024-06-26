import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { HeadingSectionSchema } from "@/lib/zod/paragraph";

const WorkElementsSchema = z.discriminatedUnion("type", [HeadingSectionSchema]);

export const WorkSchema = z.object({
  type: z.literal("node--work_main_page"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(WorkElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupWork(work: DrupalNode): Work | null {
  try {
    // Validate the top level fields first.
    const topLevelWorkData = WorkSchema.omit({
      field_content_elements: true,
    }).parse(work);

    // Validate the field_content_elements separately, one by one.
    // This way, if one of them is invalid, we can still return the rest of the work contents.
    const validatedParagraphs = work.field_content_elements
      .map((paragraph: any) => {
        const result = WorkElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating work paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelWorkData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError Work", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, work }, null, 2));
    return null;
  }
}

export type Work = z.infer<typeof WorkSchema>;
