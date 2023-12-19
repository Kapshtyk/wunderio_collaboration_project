import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import clsx from "clsx";

import { formatDate } from "@/lib/utils";
import { EventsArticles } from "@/lib/zod/events-articles";

import { MediaImage } from "./media--image";
import { RandomIcon } from "./random-icon";

interface EventCardProps {
  item: EventsArticles;
  className: string;
}

const EventCard = ({ item, className }: EventCardProps) => {
  const router = useRouter();
  return (
    <article className={clsx("@container", className)}>
      <div className="grid @lg:grid-cols-2 @lg:gap-8 gap-4 items-center">
        <div className="relative rounded-xl overflow-hidden">
          {item.field_image ? (
            <MediaImage className="rounded-xl" media={item.field_image} />
          ) : (
            <RandomIcon />
          )}
        </div>
        <div className="flex flex-col gap-y-2 @lg:gap-y-4 @xl:gap-y-8">
          <div className="flex justify-between items-center align-top">
            <div>
              {item.field_tags &&
                item.field_tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="text-xs @sm:text-sm @lg:text-md font-bold text-accent-color mt-1 pr-1 inline-block uppercase"
                  >
                    {tag.name}
                  </span>
                ))}
            </div>
            <span className="text-foreground text-xs @sm:text-sm @lg:text-md font-regular">
              {formatDate(item.created, router.locale)}
            </span>
          </div>
          <Link href={item.path.alias}>
            <h3 className="text-heading-xs @3xl:text-heading-lg 2sm:line-clamp-3">
              {item.title}
            </h3>
          </Link>
          <p className="hidden text-sm @sm:text-md @md:line-clamp-3">
            {item.field_excerpt}
          </p>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
