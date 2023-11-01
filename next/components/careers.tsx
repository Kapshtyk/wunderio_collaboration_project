import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Careers } from "@/lib/zod/careers";
import { HeadingSection } from "@/lib/zod/paragraph";
import { Paragraph } from "./paragraph";

interface CareersProps {
  careers: Careers;
}

export function Careers({ careers, ...props }: CareersProps) {
  const headingSection = careers.field_content_elements.find((element) => element.type === "paragraph--heading_section") as HeadingSection
  return (
    <>
      <div className="flex h-[100px] bg-primary-400/40 justify-between">
        <h1>{headingSection.field_heading}</h1>
        <span>{headingSection.field_excerpt}</span>
      </div>
      <div className="grid gap-4">
        {
          careers.field_content_elements?.map((paragraph) => (
            <Paragraph key={paragraph.id} paragraph={paragraph} />
          ))
        }
      </div>
    </>
  )


  // const { t } = useTranslation();
  // const router = useRouter();
  // return (
  //   <article {...props}>
  //     <HeadingPage>{article.title}</HeadingPage>
  //     {article.field_excerpt && (
  //       <div className="my-4 text-xl">{article.field_excerpt}</div>
  //     )}
  //     <div className="mb-4 text-scapaflow">
  //       {article.uid?.display_name && (
  //         <span>
  //           {t("posted-by", { author: article.uid?.display_name })} -{" "}
  //         </span>
  //       )}
  //       <span>{formatDate(article.created, router.locale)}</span>
  //     </div>
  //     {article.field_image && (
  //       <figure>
  //         <Image
  //           src={absoluteUrl(article.field_image.uri.url)}
  //           width={768}
  //           height={480}
  //           style={{ width: 768, height: 480 }}
  //           alt={article.field_image.resourceIdObjMeta.alt}
  //           className="object-cover"
  //           priority
  //         />
  //         {article.field_image.resourceIdObjMeta.title && (
  //           <figcaption className="py-2 text-center text-sm text-scapaflow">
  //             {article.field_image.resourceIdObjMeta.title}
  //           </figcaption>
  //         )}
  //       </figure>
  //     )}
  //     {article.body?.processed && (
  //       <FormattedText
  //         className="mt-4 text-md/xl text-scapaflow sm:text-lg"
  //         html={article.body?.processed}
  //       />
  //     )}
  //   </article>
  // );
}
