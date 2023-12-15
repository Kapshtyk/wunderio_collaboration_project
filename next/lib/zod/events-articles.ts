import { z } from "zod";

import { ArticleTeaserSchema } from "@/lib/zod/article-teaser";
import { EventsSchema } from "@/lib/zod/events";

const EventsArticlesSchema = z.discriminatedUnion("type", [
  ArticleTeaserSchema,
  EventsSchema,
]);

export type EventsArticles = z.infer<typeof EventsArticlesSchema>;
