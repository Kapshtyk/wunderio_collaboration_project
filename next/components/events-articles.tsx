import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";

import { formatDate } from "@/lib/utils";
import { EventsArticles } from "@/lib/zod/events-articles";

import { MediaImage } from "./media--image";
import { RandomIcon } from "./random-icon";

import { Checkbox } from "@/ui/checkbox";

interface EventsArticlesProps {
  items: EventsArticles[];
}
const EventsArticles = ({ items }: EventsArticlesProps) => {
  const router = useRouter();
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(1);

  const handleResize = () => {
    if (window.innerWidth < 570) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (isSmallScreen) {
      setStartIndex(0);
    } else {
      setStartIndex(1);
    }
  }, [isSmallScreen]);

  items.sort((a, b) => {
    if (a.created > b.created) {
      return -1;
    }
    if (a.created < b.created) {
      return 1;
    }
    return 0;
  });

  useMemo(() => {
    const allTags = items.reduce((accumulator, currentItem) => {
      const itemTags = currentItem.field_tags.map((tag) => tag.name);
      return new Set([...Array.from(accumulator), ...itemTags]);
    }, new Set());
    setAllTags(Array.from(allTags) as string[]);
  }, [items]);

  const filteredItems = items.filter((item) => {
    if (!tags.length) return items;
    return tags.some((tag: string) =>
      item.field_tags.some((itemTag) => itemTag.name === tag),
    );
  });

  if (!items) return null;

  return (
    <>
      <div className="hidden 2sm:flex h-auto gap-8">
        <div className="w-[70%] relative rounded-xl overflow-hidden">
          {filteredItems[0].field_image ? (
            <MediaImage
              className="rounded-xl"
              fill={true}
              media={filteredItems[1].field_image}
            />
          ) : (
            <RandomIcon />
          )}
        </div>
        <div className="w-full flex flex-col py-4 gap-2  md:gap-4 lg:gap-6 xl:gap-8">
          <div className="flex justify-between align-top">
            <div>
              {filteredItems[0].field_tags &&
                filteredItems[0].field_tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="text-lg font-bold text-accent-color mt-1 pr-1 inline-block uppercase"
                  >
                    {tag.name}
                  </span>
                ))}
            </div>
            <span className="text-foreground text-lg font-regular">
              {formatDate(filteredItems[0].created, router.locale)}
            </span>
          </div>
          <Link href={filteredItems[0].path.alias}>
            <h3 className="2sm:line-clamp-2">{filteredItems[0].title}</h3>
          </Link>
          <p className="2sm:line-clamp-3">{filteredItems[0].field_excerpt}</p>
        </div>
      </div>
      <div className="mt-2 2sm:mt-4 md:mt-6 lg:mt-8 xl:mt-12">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {allTags.map((tag) => (
              <Checkbox
                key={tag}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setTags([...tags, tag]);
                  } else {
                    setTags(tags.filter((t) => t !== tag));
                  }
                }}
                checked={tags.includes(tag)}
              />
            ))}
          </div>
        )}
        <div className="grid grid-flow-col-dense grid-rows-6 2sm:grid-rows-3 xl:grid-rows-2 gap-x-8 gap-y-4 2sm:gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12 justify-between">
          {filteredItems.slice(startIndex, startIndex + 6).map((item) => (
            <Link key={item.id} href={item.path.alias}>
              <article className="flex gap-6 flex-col w-full lg:w-[450px] xl:w-[320px]">
                <div className="w-full h-56 2sm:h-64 lg:w-[450px] lg:h-[450px] xl:w-[320px] xl:h-[320px] relative rounded-xl overflow-hidden">
                  {item.field_image ? (
                    <MediaImage fill={true} media={item.field_image} />
                  ) : (
                    <RandomIcon />
                  )}
                </div>
                <div className="flex justify-between align-top">
                  <div>
                    {item.field_tags &&
                      item.field_tags.map((tag) => (
                        <span
                          key={tag.name}
                          className="text-sm font-bold text-accent-color mt-1 pr-1 inline-block uppercase"
                        >
                          {tag.name}
                        </span>
                      ))}
                  </div>
                  <span className="text-foreground text-sm font-regular">
                    {formatDate(item.created, router.locale)}
                  </span>
                </div>
                <h4 className="text-heading-xs font-medium text-main">
                  {item.title}
                </h4>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsArticles;
