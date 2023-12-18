import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ContactPeopleSchema } from "@/lib/zod/paragraph";

const ContactPersonElementsSchema= z.discriminatedUnion("type", [
ContactPeopleSchema
]);

export const ContactPersonSchema = z.object({
  type: z.literal("node--contact_persons"),
  id: z.string(),
  title: z.string(),
  field_content_elements: z.array(ContactPersonElementsSchema),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupContactPerson(
  contact_person: DrupalNode,
): ContactPerson | null {
  try {
    const topLevelContactPersonData = ContactPersonSchema.omit({
      field_content_elements: true,
    }).parse(contact_person);

    const validatedParagraphs = contact_person.field_content_elements
      .map((paragraph: any) => {
        const result = ContactPeopleSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating contactPeople paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelContactPersonData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError ContactPerson", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, contact_person }, null, 2));
    return null;
  }
}

export type ContactPerson = z.infer<typeof ContactPersonSchema>;
