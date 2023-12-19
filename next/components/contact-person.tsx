import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { ContactPerson } from "@/lib/zod/contact-person";
import Image from "next/image";
import { FormattedText } from "./formatted-text";
import { HeadingParagraph } from "./heading--paragraph";
import { Media } from "./media";

interface ContactPeopleProps{
    contactPerson: ContactPerson []
  }
const ContactPeople = ({ contactPerson }: ContactPeopleProps) => {

  return (
    <>
        <div className="">
            {contactPerson.map((contact)=> {
                return(
                    <>
                    <p>{contact.field_contact_phone}</p>
                    </>
                )
            })}
      
      </div>
    </>

  );
};

export default ContactPeople;
