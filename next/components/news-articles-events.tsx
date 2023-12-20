import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";

import { formatDate } from "@/lib/utils";
import { EventsArticles } from "@/lib/zod/events-articles";
import Arrow from "@/styles/icons/arrow-down.svg";
import Watermark from "@/styles/icons/watermark.svg";

import { MediaImage } from "./media--image";
import { RandomIcon } from "./random-icon";

import { Button } from "@/ui/button";

interface NewsArticlesEventsProps {
  items: EventsArticles[];
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
  });
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <section className="h-auto section-margin flex xl:flex-row flex-col gap-8">
      <div className="relative w-full flex flex-col items-start xl:max-w-[380px]">
        {items.length > 1 && (
          <Watermark className="w-0 h-0 md:w-[188px] md:h-[116px] xl:w-[305px] xl:h-[185px] absolute text-main/20 md:right-0 xl:bottom-0 xl:-left-8" />
        )}
        <h3 className="text-heading-md text-main md:max-w-lg">
          {t("news-articles-events-title")}
        </h3>
        <p className="md:max-w-lg">{t("news-articles-events-description")}</p>
        <div className="flex flex-col pt-4">
          <Button variant="tertiary">
            {t("all-news-button")}
            <Arrow className="w-4 h-4 -rotate-90" />
          </Button>
          <Link href="/events">
            <Button onClick={() => router.push("/events")} variant="tertiary">
              {t("all-articles-events-button")}
              <Arrow className="w-4 h-4 -rotate-90" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full h-full">
        <div className="flex flex-col gap-4 2sm:gap-8">
          {items.slice(0, 3).map((item, index) => (
            <div key={index} className="flex flex-col 2sm:flex-row">
              <div className="w-full 2sm:w-56 2sm:h-56">
                {item.field_image ? (
                  <div className="w-full h-64 2sm:w-56 2sm:h-56 relative bg-cover overflow-hidden rounded-lg">
                    <MediaImage fill={true} media={item.field_image} />
                  </div>
                ) : (
                  <div className="w-full 2sm:w-56 2sm:h-56 relative bg-cover overflow-hidden rounded-lg">
                    <RandomIcon />
                  </div>
                )}
              </div>
              <div className="2sm:px-8 pt-6 2sm:pt-0">
                <Link href={item.path.alias}>
                  <h4 className="md:!text-heading-xs 2sm:line-clamp-2 text-main">
                    {item.title}
                  </h4>
                  <div className="hidden hover:block">{item.title}</div>
                </Link>
                {item.field_tags &&
                  item.field_tags.map((tag) => (
                    <span
                      key={tag.name}
                      className="text-xs font-bold text-accent-color pr-1 inline-block uppercase"
                    >
                      {tag.name}
                    </span>
                  ))}
                <p className="text-foreground 2sm:line-clamp-3 mt-2">
                  {item.field_excerpt}
                </p>
                <p className="text-foreground text-sm md:-mt-2">
                  {formatDate(item.created, router.locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsArticlesEvents;
