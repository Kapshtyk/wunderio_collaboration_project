import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { FormattedText } from "@/components/formatted-text";
import { HeadingPage } from "@/components/heading--page";
import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { formatDate } from "@/lib/utils";
import { Article } from "@/lib/zod/article";

import { Breadcrumbs } from "./breadcrumbs";

interface ArticleProps {
  article: Article;
}

export function Article({ article, ...props }: ArticleProps) {
  const { t } = useTranslation();
  const router = useRouter();
  console.log("articlesmy", article);

  const breadcrumbs = [
    {
      //TODO: fix link and style ALL ARTICLES page
      title: t("all-articles-link"),
      url: "/all-articles",
    },
    {
      title: article.title,
      url: article.path.alias,
    },
  ];

  return (
    <article {...props}>
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <HeadingPage title={article.title} />
      {article.field_excerpt && (
        <div className="my-4 text-xl">{article.field_excerpt}</div>
      )}

      <div className="flex items-center justify-center bg-primary-50 p-2 rounded-md shadow-md mb-4">
        {article.uid?.field_profile_picture?.uri && (
          <div className="w-12 h-12">
            <Image
              src={absoluteUrl(article.uid?.field_profile_picture?.uri.url)}
              width={100}
              height={100}
              alt="Author Image"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        )}

        <div className="flex-grow ml-4 h-6">
          {article.uid?.display_name && (
            <p className="text-lg font-semibold text-accent-hugs">
              {t("posted-by", { author: article.uid?.display_name })}
            </p>
          )}
          <span className="text-accent-hugs">
            {formatDate(article.created, router.locale)}
          </span>
        </div>
      </div>

      {article.field_image && (
        <figure>
          <Image
            src={absoluteUrl(article.field_image.uri.url)}
            width={768}
            height={480}
            style={{ width: 768, height: 480 }}
            alt={article.field_image.resourceIdObjMeta.alt}
            className="object-cover"
            priority
          />
          {article.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-center text-sm text-scapaflow">
              {article.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}
      {article.body?.processed && (
        <FormattedText
          className="mt-4 text-md/xl text-scapaflow sm:text-lg"
          html={article.body?.processed}
        />
      )}
    </article>
  );
}
