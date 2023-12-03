import { DrupalNode } from 'next-drupal'
import { z } from 'zod'

import { MetatagsSchema } from '@/lib/zod/metatag'

export const AddressSchema = z.object({
    address_line1:z.string(),
    address_line2:z.string().nullable(),
    postal_code:z.string(),
    locality:z.string(),
    administrative_area:z.string()
});

export const GeofieldSchema = z.object({
    lat:z.number(),
    lon:z.number()
})

export const OfficeLocationsSchema = z.object({
  type: z.literal('node--office_locations'),
  id: z.string(),
  title: z.string(),
  field_office_address: GeofieldSchema,
  field_address: AddressSchema,
  metatag: MetatagsSchema.optional(),
  path: z.object({
    alias: z.string().nullable()
  })
})

export function validateAndCleanupOfficeLocations(
  officeLocations: DrupalNode
): OfficeLocations| null {
  try {
    return OfficeLocationsSchema.parse(officeLocations)
  } catch (error) {
    const { name = 'ZodError', issues = [] } = error
    console.log(JSON.stringify({ name, issues, officeLocations }, null, 2))
    return null
  }
}

export type OfficeLocations = z.infer<typeof OfficeLocationsSchema>
