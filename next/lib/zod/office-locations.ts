import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";

export const GeofieldSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

export const OfficeLocationsSchema = z.object({
  type: z.literal("node--office_locations"),
  id: z.string(),
  title: z.string(),
  field_address_coordinates: GeofieldSchema,
  field_office_address: z.string(),
  field_office_email: z.string(),
  metatag: MetatagsSchema.optional(),
  path: z.object({
    alias: z.string().nullable(),
  }),
});

export function validateAndCleanupOfficeLocations(
  officeLocations: DrupalNode,
): OfficeLocations | null {
  try {
    return OfficeLocationsSchema.parse(officeLocations);
  } catch (error) {
    const { name = "ZodError Office Locations", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, officeLocations }, null, 2));
    return null;
  }
}

export type OfficeLocations = z.infer<typeof OfficeLocationsSchema>;
