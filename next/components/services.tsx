import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Services } from "@/lib/zod/services";
import { HeadingSection } from "@/lib/zod/paragraph";
import { Paragraph } from "./paragraph";

interface ServicesProps {
  services: Services;
}

export function Services({ services, ...props }: ServicesProps) {
  const headingSection = services.field_content_elements.find((element) => element.type === "paragraph--heading_section") as HeadingSection
  return (
    <>
      <div className="flex h-[100px] bg-primary-400/40 justify-between">
        <h1>{headingSection.field_heading}</h1>
        <span>{headingSection.field_excerpt}</span>
      </div>
      <div className="grid gap-4">
        {
          services.field_content_elements?.map((paragraph) => (
            <Paragraph key={paragraph.id} paragraph={paragraph} />
          ))
        }
      </div>
    </>
  )}

