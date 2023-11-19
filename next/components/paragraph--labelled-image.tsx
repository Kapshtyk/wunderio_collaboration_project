import { Media } from "@/components/media";
import { LabelledImage } from "@/lib/zod/paragraph";

export function ParagraphLabelledImage({ paragraph }: { paragraph: LabelledImage }) {
  return (
  <>
  <Media media={paragraph.field_image} priority={true} />
  <p>{paragraph.field_label}</p>
  </>
  )
  
}