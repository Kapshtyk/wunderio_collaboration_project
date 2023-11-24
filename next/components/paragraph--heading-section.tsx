import { HeadingSection as HeadingSectionType } from "@/lib/zod/paragraph";
import { HeadingParagraph } from "./heading--paragraph";



export function ParagraphHeadingSection({ paragraph }: { paragraph: HeadingSectionType }) {
    return (
        <>
            <div className=" bg-primary-400/40 justify-between">
                {paragraph.field_heading && (
                    <HeadingParagraph>{paragraph.field_heading}</HeadingParagraph>
                )}
                <p>{paragraph.field_excerpt}</p>
            </div>
        </>
    )

}