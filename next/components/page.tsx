import { Paragraph } from "@/components/paragraph";
import type { Page } from "@/lib/zod/page";

import { Breadcrumbs } from "./breadcrumbs";

interface PageProps {
  page: Page;
}

export function Page({ page }: PageProps) {
  const breadcrumbs = [
    {
      title: page.title,
      url: page.path.alias,
    },
  ];

  return (
    <>
      <div className="container">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
      </div>
      <div className="grid gap-4">
        {page.field_content_elements?.map((paragraph) => (
          <Paragraph key={paragraph.id} paragraph={paragraph} />
        ))}
      </div>
    </>
  );
}
