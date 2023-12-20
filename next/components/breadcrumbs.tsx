import Link from "next/link";
import { useTranslation } from "next-i18next";

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
    <nav aria-label="Breadcrumb">
      <ol className="hidden 2sm:flex pt-4">
        {breadCrumbs.map((item, index) => (
          <li
            key={index}
            className="flex items-center truncate !mb-0 last:after:border-r-0 after:content=['']  after:border-r-2 after:border-main after:h-4  after:ml-3 after:mr-3 after:-skew-x-12"
          >
            {item.url ? (
              <Link
                className="text-main flex items-center"
                href={item.url}
                aria-current={
                  index === breadCrumbs.length - 1 ? "page" : undefined
                }
              >
                {item.title}
              </Link>
            ) : (
              item.title
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
