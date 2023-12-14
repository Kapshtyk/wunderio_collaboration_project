import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";

const LegalDocumentSchema = z.object({
  type: z.literal("node--legal_document"),
  metatag: MetatagsSchema.optional(),
  title: z.string(),
  body: z.object({
    processed: z.string(),
  }),
});

export function validateAndCleanupLegalDocument(
  legal_document: DrupalNode,
): LegalDocument | null {
  try {
    return LegalDocumentSchema.parse(legal_document);
  } catch (error) {
    const { name = "ZodError Legal Docs", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, legal_document }, null, 2));
    return null;
  }
}

export type LegalDocument = z.infer<typeof LegalDocumentSchema>;
