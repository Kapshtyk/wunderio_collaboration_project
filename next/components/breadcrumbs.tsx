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
    <nav>
      <ul
        className="hidden 2sm:flex py-4"
        aria-label="breadcrumbs"
        role="navigation"
      >
        {breadCrumbs.map((item, index) => (
          <li key={index} className="flex items-center truncate">
            {item.url ? (
              <Link className="text-main" href={item.url}>
                {item.title}
              </Link>
            ) : (
              item.title
            )}
            {index !== breadCrumbs.length - 1 && (
              <svg
                className="mx-2 text-main"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
