import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

export interface BreadcrumbsProps {
  items: {
    title: string;
    url?: string;
  }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useTranslation();
  const defaultBreadcrumbs = [
    {
      title: t("homepage-link"),
      url: "/",
    },
  ];

  if (!items?.length) {
    return null;
  }

  const breadCrumbs = [...defaultBreadcrumbs, ...items];

  return (
    <nav className="py-4 text-sm font-medium text-primary-600">
      <ul className="flex" aria-label="breadcrumbs" role="navigation">
        {breadCrumbs.map((item, index) => (
          <li key={index} className="flex max-w-[300px] items-center truncate">
            {item.url ? (
              <Link className="underline text-link" href={item.url}>
                {item.title}
              </Link>
            ) : (
              item.title
            )}
            {index !== breadCrumbs.length - 1 && (
              <svg className="mx-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
