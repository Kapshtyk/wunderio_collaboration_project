import { Media } from "@/components/media";
import { LabelledImage } from "@/lib/zod/paragraph";

export function ParagraphLabelledImage({
  paragraph,
}: {
  paragraph: LabelledImage;
}) {
  return (
    <>
      <div className="mt-8 mb-8">
        <Media media={paragraph.field_image} priority={true} />
        <p className="text-stone text-sm">{paragraph.field_label}</p>
      </div>
    </>
  );
}
