import React from "react";

import { EventsArticles } from "@/lib/zod/events-articles";

import EventCard from "./event-card";

interface EventsArticlesProps {
  items: EventsArticles[];
}
const EventsArticles = ({ items }: EventsArticlesProps) => {
  items.sort((a, b) => {
    if (a.created > b.created) {
      return -1;
    }
    if (a.created < b.created) {
      return 1;
    }
    return 0;
  });

  if (!items) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 md:gap-6 lg:gap-8">
      {items.map((item) => (
        <EventCard
          key={item.id}
          className="first:md:col-span-2 first:lg:col-span-3 first:mb-6"
          item={item}
        />
      ))}
    </div>
  );
};

export default EventsArticles;
