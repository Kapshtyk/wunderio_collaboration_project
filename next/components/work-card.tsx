import Link from 'next/link'

import { MediaImage } from './media--image'

export function WorkCards({ title, contentElements, path }) {
  return (
    <div className="w-90 h-100 p-2 m-2 rounded-lg">
      {contentElements &&
        contentElements
          .filter((element) => element.type === 'paragraph--work_card')
          .map((paragraph) => (
            <div key={paragraph.id}>
              <Link href={'work' + path}>
                <MediaImage
                  className="rounded-lg h-60 hover:saturate-150"
                  media={paragraph.field_image}
                />
                <h3 className="text-primary-600 py-3 font-bold hover:underline">
                  {title}
                </h3>
              </Link>
              <h1>{paragraph.field_excerpt}</h1>
            </div>
          ))}
    </div>
  )
}
