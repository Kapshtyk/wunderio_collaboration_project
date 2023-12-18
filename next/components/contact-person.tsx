import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { ContactPerson } from "@/lib/zod/contact-person";
import Image from "next/image";

interface ContactPeopleProps{
    contactPerson: ContactPerson
  }
const ContactPeople = ({ contactPerson }: ContactPeopleProps) => {

    const image = contactPerson.field_content_elements.map((image)=> console.log("image",image))

  return (
    <>
        <div className="">
            {contactPerson.field_content_elements.map((content)=> {
                return(
                    <>
                             <Image
            src={absoluteUrl(content.field_image.field_media_image.uri.url)}
            width={768}
            height={480}
            style={{ width: 768, height: 480 }}
            alt={content.field_image.field_media_image.resourceIdObjMeta.alt}
            className="object-cover"
            priority
          />
                    </>
                )
            })}
      
      </div>
    </>

  );
};

export default ContactPeople;
