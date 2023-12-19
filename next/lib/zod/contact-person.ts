import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";

/* import { ImageShape } from "./paragraph"; */

export const ContactPersonSchema = z.object({
  type: z.literal("node--contact_persons"),
  id: z.string(),
  title: z.string(),
  body: z
    .object({
      processed: z.string(),
    })
    .nullable(),
  /*  field_image: ImageShape.nullable(), */
  field_full_name: z.string(),
  field_excerpt: z.string(),
  field_contact_email: z.string(),
  field_contact_phone: z.string(),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupContactPerson(
  contactPerson: DrupalNode,
): ContactPerson | null {
  try {
    return ContactPersonSchema.parse(contactPerson);
  } catch (error) {
    const { name = "ZodError Contact Person", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, contactPerson }, null, 2));
    return null;
  }
}

export type ContactPerson = z.infer<typeof ContactPersonSchema>;
