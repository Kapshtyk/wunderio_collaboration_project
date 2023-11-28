import { WorkCard as WorkCardType } from "@/lib/zod/paragraph";
import { Media } from "@/components/media";

export function ParagraphWorkCard({ paragraph }: { paragraph: WorkCardType }) {
    return (

        <div>
            <div className="justify-between w-5/6">
                <div >< Media media={paragraph.field_image} priority={true} /></div>
                <p className="pt-2">{paragraph.field_excerpt}</p>

            </div>
        </div>

    )

}