import React from "react";

import { Participant } from "@/lib/zod/events";

import { FormattedText } from "./formatted-text";
import { MediaImage } from "./media--image";

interface EventParticipantCardProps {
  participant: Participant;
}

const EventParticipantCard = ({ participant }: EventParticipantCardProps) => {
  return (
    <article className="@container">
      <div className="flex flex-col gap-2 @lg:gap-6 @sm:flex-row">
        <div>
          <div className="relative @sm:w-60 rounded-full aspect-w-1 aspect-h-1 overflow-hidden">
            <MediaImage
              media={participant.field_personal_data.field_profile_picture}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h3 className="text-heading-xs line-clamp-2">{participant.title}</h3>
          <FormattedText
            className="line-clamp-6"
            html={participant.body.processed}
          />
        </div>
      </div>
    </article>
  );
};

export default EventParticipantCard;
