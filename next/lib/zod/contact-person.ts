import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape } from "@/lib/zod/paragraph";

export const ContactPersonSchema = z.object({
  type: z.literal("node--contact_persons"),
  id: z.string(),
  title: z.string(),
  body: z.object({
    processed: z.string(),
  }).nullable().optional(),
  field_image: ImageShape.nullable().optional(),
  field_full_name: z.string().nullable().optional(),
  field_excerpt: z.string().nullable().optional(),
  field_contact_email: z.string().nullable().optional(),
  field_contact_phone: z.string().nullable().optional(),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupContactPerson(
  contactPerson: DrupalNode,
): ContactPerson | null {
  try { 
    return ContactPersonSchema.parse(contactPerson)

  } catch (error) {
    const { name = "ZodError Contact Person", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, contactPerson }, null, 2));
    return null;
  }
}

export type ContactPerson = z.infer<typeof ContactPersonSchema>;
