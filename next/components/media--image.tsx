import NextImage, { ImageProps } from "next/image";
import clsx from "clsx";

import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { Image, ImageShape } from "@/lib/zod/paragraph";

interface MediaImageProps extends Partial<ImageProps> {
  media: Image["field_image"] | ImageShape;
}

export function MediaImage({
  media,
  width,
  height,
  className,
  fill,
  ...props
}: MediaImageProps) {
  const image = media?.type === "media--image" ? media.field_media_image : media;

  if (!image) {
    return null;
  }

  if (fill) {
    return (
      <NextImage
        src={absoluteUrl(image.uri.url)}
        alt={image.resourceIdObjMeta.alt || "Image"}
        title={image.resourceIdObjMeta.title}
        fill
        sizes="100%"
        className={clsx(
          "h-auto max-w-full object-center object-cover",
          className,
        )}
        {...props}
      />
    );
  } else {
    return (
      <NextImage
        src={absoluteUrl(image.uri.url)}
        alt={image.resourceIdObjMeta.alt || "Image"}
        title={image.resourceIdObjMeta.title}
        width={width || image.resourceIdObjMeta.width}
        height={height || image.resourceIdObjMeta.height}
        className={clsx("h-auto max-w-full object-cover", className)}
        {...props}
      />
    );
  }
}
