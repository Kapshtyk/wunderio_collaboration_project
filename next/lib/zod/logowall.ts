import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import { ImageShape } from "@/lib/zod/paragraph";

export const LogoWallSchema = z.object({
  type: z.literal("node--logowall"),
  id: z.string(),
  title: z.string(),
  field_image: ImageShape.nullable(),
  field_field_link_client_site: z.object({
    full_url: z.string(),
  }),
  metatag: MetatagsSchema.optional(),
});

export function validateAndCleanupLogoWall(page: DrupalNode): LogoWall | null {
  try {
    return LogoWallSchema.parse(page);
  } catch (error) {
    const { name = "ZodError", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, page }, null, 2));
    return null;
  }
}

export type LogoWall = z.infer<typeof LogoWallSchema>;
