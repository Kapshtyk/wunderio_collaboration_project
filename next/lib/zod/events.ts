import { DrupalNode } from "next-drupal";
import { z } from "zod";

import { MetatagsSchema } from "@/lib/zod/metatag";
import {
  FormattedTextSchema,
  HeadingSectionSchema,
  ImageSchema,
  ImageShape,
} from "@/lib/zod/paragraph";

import { GeofieldSchema } from "./office-locations";

const EventsElementsSchema = z.discriminatedUnion("type", [
  HeadingSectionSchema,
  FormattedTextSchema,
  ImageSchema,
]);

export const VenueSchema = z.object({
  type: z.literal("node--venue"),
  id: z.string(),
  title: z.string(),
  body: z
    .object({
      value: z.string(),
      format: z.string(),
      processed: z.string(),
    })
    .nullable()
    .optional(),
  field_venue_coordinates: GeofieldSchema,
  field_venue_address: z.string(),
});

export const ParticipantSchema = z.object({
  type: z.literal("node--people"),
  id: z.string(),
  title: z.string(),
  body: z.object({
    value: z.string(),
    format: z.string(),
    processed: z.string(),
  }),
  field_personal_data: z.object({
    id: z.string(),
    display_name: z.string(),
    field_profile_picture: ImageShape.nullable().optional(),
  }),
});

export const EventsSchema = z.object({
  type: z.literal("node--event"),
  id: z.string(),
  title: z.string(),
  created: z.string(),
  field_content_elements: z.array(EventsElementsSchema),
  metatag: MetatagsSchema.optional(),
  path: z.object({
    alias: z.string(),
  }),
  field_image: ImageShape.nullable(),
  field_excerpt: z.string(),
  field_tags: z
    .array(
      z.object({
        name: z.string().nullable(),
      }),
    )
    .nullable()
    .optional(),
  body: z
    .object({
      value: z.string(),
      format: z.string(),
      processed: z.string(),
    })
    .nullable()
    .optional(),
  field_event_registration: z.object({
    id: z.string(),
    resourceIdObjMeta: z
      .object({
        drupal_internal__target_id: z.string(),
      })
      .nullable()
      .optional(),
  }),
  field_participant: z.array(ParticipantSchema).nullable(),
  field_venue: z.object({
    title: z.string(),
    field_venue_coordinates: GeofieldSchema,
    field_venue_address: z.string(),
  }),
});

export const SideEventSchema = z.object({
  type: z.literal("node--side_event"),
  id: z.string(),
  title: z.string(),
  field_main_event: z.object({
    title: z.string(),
    path: z.object({
      alias: z.string(),
    }),
  }),
  metatag: MetatagsSchema.optional(),
  path: z.object({
    alias: z.string(),
  }),
  field_content_elements: z.array(EventsElementsSchema),
  body: z.object({
    value: z.string(),
    format: z.string(),
    processed: z.string(),
  }),
  field_side_event_registration: z.object({
    id: z.string(),
    resourceIdObjMeta: z.object({
      drupal_internal__target_id: z.string(),
    }),
  }),
});

export const SideEventsSchema = z.array(SideEventSchema);

export function validateAndCleanupEvents(event: DrupalNode): Events | null {
  try {
    const topLevelEventsData = EventsSchema.omit({
      field_content_elements: true,
    }).parse(event);

    const validatedParagraphs = event.field_content_elements
      .map((paragraph: any) => {
        const result = EventsElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating event paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelEventsData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError Events", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, event }, null, 2));
    return null;
  }
}

export function validateAndCleanupSideEvents(
  sideEvent: DrupalNode,
): SideEvent | null {
  try {
    const topLevelEventsData = SideEventSchema.omit({
      field_content_elements: true,
    }).parse(sideEvent);

    const validatedParagraphs = sideEvent.field_content_elements
      .map((paragraph: any) => {
        const result = EventsElementsSchema.safeParse(paragraph);

        switch (result.success) {
          case true:
            return result.data;
          case false:
            console.log(
              `Error validating side event paragraph ${paragraph.type}: `,
              JSON.stringify(result.error, null, 2),
            );
            return null;
        }
      })
      .filter(Boolean);

    return {
      ...topLevelEventsData,
      field_content_elements: validatedParagraphs,
    };
  } catch (error) {
    const { name = "ZodError Side Events", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, sideEvent }, null, 2));
    return null;
  }
}

export function validateAndCleanupVenue(venue: DrupalNode): Venue | null {
  try {
    return VenueSchema.parse(venue);
  } catch (error) {
    const { name = "ZodError Venue", issues = [] } = error;
    console.log(JSON.stringify({ name, issues, venue }, null, 2));
    return null;
  }
}

export type Events = z.infer<typeof EventsSchema>;
export type SideEvent = z.infer<typeof SideEventSchema>;
export type SideEvents = z.infer<typeof SideEventsSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type Venue = z.infer<typeof VenueSchema>;
