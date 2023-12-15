import React from "react";

import Arrow from "@/styles/icons/arrow-down.svg";
import Watermark from "@/styles/icons/watermark.svg";

import { Button } from "@/ui/button";
import { MediaImage } from "./media--image";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { RandomIcon } from "./random-icon";
import { EventsArticles } from "@/lib/zod/events-articles";


interface NewsArticlesEventsProps {
  items: EventsArticles[]
}

const NewsArticlesEvents = ({ items }: NewsArticlesEventsProps) => {
  items.sort((a, b) => {
    if (a.created > b.created) {
      return -1;
    }
    if (a.created < b.created) {
      return 1;
    }
    return 0;
  })
  const router = useRouter();
  return (
    <div className="h-auto pt-[96px] flex gap-8">
      <div className="relative w-full max-w-[380px]">
        {items.length > 1 && <Watermark className="w-[305px] h-[185px] absolute text-main/20 bottom-0 left-0" />}
        <h3 className="text-heading-md font-bold text-main">News, articles & events</h3>
        <p className="text-lg font-medium text-foreground">The newest and most exciting things happing in our company right now</p>
        <div className="flex flex-col pt-4">
          <Button variant="tertiary">
            <span>All news</span>
            <Arrow className="w-4 h-4 -rotate-90" />
          </Button>
          <Button
            onClick={() => router.push("/events")}
            variant="tertiary">
            <span>All articles & events</span>
            <Arrow className="w-4 h-4 -rotate-90" />
          </Button>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="flex flex-col gap-8">
          {items.slice(0, 3).map((item, index) => (
            <div key={index} className="flex">
              <div className="w-56 h-56">
                <div className="w-56 h-56 relative bg-cover overflow-hidden rounded-lg">
                  {item.field_image ? <MediaImage fill={true} media={item.field_image} /> : <RandomIcon />}
                </div>
              </div>
              <div className="px-8">
                <Link href={item.path.alias}>
                  <h4 className="text-heading-sx font-bold text-main">
                    {item.title}
                  </h4>
                </ Link >
                {item.field_tags && (
                  item.field_tags.map((tag) => (
                    <span key={tag.name} className="text-xs font-bold text-accent-color mt-1 pr-1 inline-block uppercase">{tag.name}</span>
                  ))
                )}
                <p className="text-foreground text-sm font-regular mt-4">
                  {item.field_excerpt}
                </p>
                <p className="text-foreground text-sm font-regular mt-6">{formatDate(item.created, router.locale)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default NewsArticlesEvents;
