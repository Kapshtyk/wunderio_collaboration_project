import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";

import { ImageShape } from "./paragraph";

export const OpenPositionsSchema = z.object({
  type: z.literal("node--open_positions"),
  id: z.string(),
  title: z.string(),
  body: z.object({
    value: z.string(),
    format: z.string(),
    processed: z.string(),
  }),
  field_basic_info: z.object({
    body: z.object({
      value: z.string(),
      format: z.string(),
      processed: z.string(),
    }),
  }),
  field_country: z.object({
    name: z.string(),
  }),
  field_office: z.object({
    name: z.string(),
  }),
  field_position: z.object({
    name: z.string(),
  }),
  metatag: MetatagsSchema.optional(),
  path: z.object({
    alias: z.string(),
  }),
  field_position_image: ImageShape.nullable(),
});

export function validateAndCleanupOpenPositions(
  openPositions: DrupalNode,
): OpenPositions | null {
  try {
    return OpenPositionsSchema.parse(openPositions);
  } catch (error) {
    const { name = "ZodError Open Positions", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, openPositions }, null, 2));
    return null;
  }
}

export type OpenPositions = z.infer<typeof OpenPositionsSchema>;
