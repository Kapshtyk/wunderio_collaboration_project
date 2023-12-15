import Link from "next/link";
import React, { useMemo, useState } from "react";

import { RandomIcon } from "./random-icon";
import { EventsArticles } from "@/lib/zod/events-articles";
import { useRouter } from "next/router";
import { MediaImage } from "./media--image";
import { formatDate } from "@/lib/utils";
import { Checkbox } from "@/ui/checkbox";

interface EventsArticlesProps {
  items: EventsArticles[]
}
const EventsArticles = ({ items }: EventsArticlesProps) => {
  const router = useRouter();
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  items.sort((a, b) => {
    if (a.created > b.created) {
      return -1;
    }
    if (a.created < b.created) {
      return 1;
    }
    return 0;
  })

  useMemo(() => {
    const allTags = items.reduce((accumulator, currentItem) => {
      const itemTags = currentItem.field_tags.map((tag) => tag.name);
      return new Set([...Array.from(accumulator), ...itemTags]);
    }, new Set());
    setAllTags(Array.from(allTags) as string[])
  }, [])

  const filteredItems = items.filter((item) => {
    if (!tags.length) return items;
    return tags.some((tag: string) =>
      item.field_tags.some((itemTag) => itemTag.name === tag)
    );
  })

  if (!items) return null;

  return (
    <>
      <section className="pt-20">
        <div className="h-auto flex gap-8">
          <div className="w-full relative max-w-[480px] aspect-square rounded-xl overflow-hidden">
            {filteredItems[0].field_image ? <MediaImage fill={true} media={filteredItems[0].field_image} /> : <RandomIcon />}
          </div>
          <div className="w-full flex flex-col py-4 gap-8">
            <div className="flex justify-between align-top">
              <div>
                {filteredItems[0].field_tags && (
                  filteredItems[0].field_tags.map((tag) => (
                    <span key={tag.name} className="text-lg font-bold text-accent-color mt-1 pr-1 inline-block uppercase">{tag.name}</span>
                  ))
                )}
              </div>
              <span className="text-foreground text-lg font-regular">{formatDate(filteredItems[0].created, router.locale)}</span>
            </div>
            <Link href={filteredItems[0].path.alias}>
              <h3 className="text-heading-lg font-bold text-main">
                {filteredItems[0].title}
              </h3>
            </ Link >
            <p className="text-foreground text-lg font-regular">
              {filteredItems[0].field_excerpt}
            </p>
          </div>
        </div>
      </section>
      <section className="py-24">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {allTags.map((tag) => (
              <Checkbox
                key={tag}
                onCheckedChange={
                  (checked) => {
                    if (checked) {
                      setTags([...tags, tag]);
                    } else {
                      setTags(tags.filter((t) => t !== tag));
                    }
                  }
                }
                checked={tags.includes(tag)}
              />
            ))}
          </div>
        )
        }
        <div className="grid grid-flow-col-dense grid-rows-2 gap-x-8 gap-y-12">
          {filteredItems.slice(1, 7).map((item) => (
            <Link key={item.id} href={item.path.alias}>
              <article className="max-w-xs flex gap-6 flex-col p">
                <div className="w-[320px] h-[320px] relative rounded-xl overflow-hidden">
                  {item.field_image ? <MediaImage fill={true} media={item.field_image} /> : <RandomIcon />}
                </div>
                <div className="flex justify-between align-top">
                  <div>
                    {item.field_tags && (
                      item.field_tags.map((tag) => (
                        <span key={tag.name} className="text-sm font-bold text-accent-color mt-1 pr-1 inline-block uppercase">{tag.name}</span>
                      ))
                    )}
                  </div>
                  <span className="text-foreground text-sm font-regular">{formatDate(item.created, router.locale)}</span>
                </div>
                <h4 className="text-heading-xs font-medium text-main">
                  {item.title}
                </h4>
              </article>
            </Link>
          ))}
        </div>
      </section >
    </>
  );
};

export default EventsArticles;
