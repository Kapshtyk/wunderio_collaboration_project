import { Testimonial } from '@/lib/zod/testimonials'
import React from 'react'
import { FormattedText } from './formatted-text'
import { Paragraph } from './paragraph'
import Image from 'next/image'
import { MediaImage } from './media--image'

interface TestimonialsProps {
  testimonials: Testimonial[],
  title: string,
  description: string,
}

const Testimonials = ({ testimonials, title, description }: TestimonialsProps) => {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0)

  return (
    <section className="w-full grid grid-cols-2 min-h-[400px]">
      <div className="col-span-1 bg-primary-500 text-white px-20 gap-2 flex flex-col justify-center h-full">
        <h2 className="text-heading-lg font-bold">{title}</h2>
        <p className='text-lg font-regular'>{description}</p>
      </div>
      <div className="p-10 ">
        <div className="relative pt-24 flex flex-col gap-6">
          <svg className="absolute top-0 right-0" width="80" height="65" viewBox="0 0 80 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.3" clip-path="url(#clip0_4693_4205)">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 54.8482C11.9297 49.2082 17.8944 42.5814 17.8944 34.9675C12.8096 34.4035 8.60497 32.406 5.28031 28.9751C1.95565 25.5441 0.293353 21.5727 0.293353 17.0607C0.293353 12.2668 1.90676 8.22489 5.13364 4.93492C8.36051 1.64496 12.4185 0 17.3077 0C22.7836 0 27.5261 2.13845 31.5352 6.4154C35.5443 10.6924 37.5489 15.8857 37.5489 21.9957C37.5489 40.3255 26.8906 54.6601 5.57366 65L0 54.8482ZM42.1003 54.8482C54.1277 49.2082 60.1413 42.5814 60.1413 34.9675C54.9588 34.4035 50.7052 32.406 47.3806 28.9751C44.0559 25.5441 42.3936 21.5727 42.3936 17.0607C42.3936 12.2668 44.0315 8.22489 47.3072 4.93492C50.583 1.64496 54.6654 0 59.5546 0C65.0305 0 69.7486 2.13845 73.7088 6.4154C77.6691 10.6924 79.6492 15.8857 79.6492 21.9957C79.6492 40.3255 69.0397 54.6601 47.8206 65L42.1003 54.8482Z" fill="#653CC5" />
            </g>
            <defs>
              <clipPath id="clip0_4693_4205">
                <rect width="80" height="65" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div className="flex items-center">
            {testimonials[currentTestimonial].field_content_elements?.map((paragraph) => {
              if (paragraph.type === 'paragraph--image') {
                return (
                  <div className="rounded-full h-14 w-14 overflow-hidden mr-4" key={paragraph.id}>
                    <MediaImage media={paragraph.field_image} />
                  </div>
                )
              }
            }
            )}
            <span className="text-lg font-bold">
              {testimonials[currentTestimonial].title}
            </span>
          </div>
          <div className="body-lg font-regular">
            <FormattedText html={testimonials[currentTestimonial].body.processed} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
