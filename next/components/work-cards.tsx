import Link from "next/link";
import { MediaImage } from "./media--image";
import { WorkCard } from "@/lib/zod/paragraph";
import { useTranslation } from "react-i18next";
import { Page as PageType } from "@/lib/zod/page";
import { DrupalTaxonomyTerm } from "next-drupal";



export function WorkCards({ allPages, tags }) {
    return (
        <div>
            {tags.map((tag: DrupalTaxonomyTerm) => (
                <div className="grid grid-cols-3 gap-6" key={tag.id}>
                    {allPages
                        .filter((workPage: PageType) => workPage.field_page_types?.name === tag.name)
                        .map((workPage: PageType) => (
                            <div key={workPage.id}>
                                {workPage.field_content_elements &&
                                    workPage.field_content_elements
                                        .filter((element) => element.type === "paragraph--work_card")
                                        .map((paragraph: WorkCard) => (
                                            <div key={paragraph.id}>
                                                <Link href={"work" + workPage.path.alias}>
                                                    <MediaImage className="rounded-lg h-60 hover:saturate-150" media={paragraph.field_image} />
                                                    <h3 className="text-primary-600 py-3 font-bold hover:underline">{workPage.title}</h3>
                                                </Link>
                                                <h1>{paragraph.field_excerpt}</h1>
                                            </div>
                                        ))}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    )
}