import Link from "next/link";
import React from "react";
import Icon1 from '@/styles/illustrations/1.svg'
import Icon2 from '@/styles/illustrations/2.svg'
import Icon3 from '@/styles/illustrations/3.svg'

import { HeadingSection as HeadingSectionType } from "@/lib/zod/paragraph";


import { Events } from "@/lib/zod/events";

interface EventsProps {
  events: Events[];
}
const Events = ({ events }: EventsProps) => {
  if (!events) return null;

  return (
    <div className="gap-4 flex-wrap flex-col items-center sm:flex sm:items-start">
      {events.map((event) => {
        const description = event.field_content_elements?.find((element) => element.type === 'paragraph--heading_section') as HeadingSectionType;
        return (
          <Link
            key={event.id}
            href={event.path.alias}
            className="relative w-[300px] flex flex-col transition-all shadow-lg hover:shadow-sm rounded-md overflow-hidden items-center"
          >
            <div className="w-[101%]">
              <RandomIcon />
            </div>
            {description && description.field_excerpt && (
              <div className="opacity-0 bg-foreground/70 absolute top-0 left-0 p-4 flex hover:opacity-100 items-center w-full h-[305px] transition-all duration-200 ease-in-out backdrop-blur-sm">
                <p className="text-sm font-regular">{description.field_excerpt}</p>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-md font-bold text-primary-500">{event.title}</h3>
            </div>

          </Link>
        )
      }
      )}
    </div>
  );
};

export default Events;

const RandomIcon = () => {
  const icons = [
    <Icon1 />,
    <Icon2 />,
    <Icon3 />
  ]
  return icons[Math.floor(Math.random() * icons.length)];
}

