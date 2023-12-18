import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { ContactPerson } from "@/lib/zod/contact-person";
import Image from "next/image";
import { FormattedText } from "./formatted-text";
import { HeadingParagraph } from "./heading--paragraph";

interface ContactPeopleProps{
    contactPerson: ContactPerson
  }
const ContactPeople = ({ contactPerson }: ContactPeopleProps) => {

    const image = contactPerson.field_content_elements.map((image)=> console.log("image",image))

    console.log('contact', contactPerson);
    

  return (
    <>
        <div className="">
            {contactPerson.field_content_elements.map((content)=> {
                return(
                    <>
                    {content.type==="paragraph--contact_people" && (
                        <HeadingParagraph key={content.id}>{content.field_full}</HeadingParagraph>
                    )}
            <Image
            src={absoluteUrl(content.field_image.field_media_image.uri.url)}
            width={768}
            height={480}
            style={{ width: 768, height: 480 }}
            alt={content.field_image.field_media_image.resourceIdObjMeta.alt}
            className="object-cover"
            priority
          />
          <p>{content.field_full}</p>
          <p>{content.field_label}</p>
          
                    </>
                )
            })}
      
      </div>
    </>

  );
};

export default ContactPeople;
