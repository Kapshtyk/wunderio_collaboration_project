import { absoluteUrl } from "@/lib/drupal/absolute-url";
import { ContactPerson } from "@/lib/zod/contact-person";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface ContactPeopleProps {
  contactPerson: ContactPerson [];
}


const ContactPeople = ({ contactPerson }: ContactPeopleProps) => {
    const {t} = useTranslation()

    return (
      <>
        <div className="text-center text-5xl font-bold leading-[60px] tracking-tighter max-md:max-w-full max-md:text-4xl">
         <h2>{t("Meet our team")}</h2> 
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1216px] mx-auto mt-16">
          {contactPerson.map((contact) => (
            <div key={contact.id} className="contact-card">
              <div className="profile-image">
                <Image
                  width={400}
                  height={400}
                  src={absoluteUrl(contact.field_image.uri.url)}
                  alt={contact.field_image.resourceIdObjMeta.alt}
                  className="rounded-[50%]"
                />
              </div>
              <div className="text-center pt-2 flex-col items-center">
                <div className="font-semibold">{contact.field_full_name}</div>
                <div className="text-base text-stone uppercase text-sm">{contact.field_excerpt}</div>
                <Link
                href={`mailto:${contact.field_contact_email}`}
                className="underline hover:text-primary-600 text-center"
                >
                {contact.field_contact_email}
                </Link>
                <div>
                <Link
                href={`mailto:${contact.field_contact_phone}`}
                className="hover:text-primary-600 underline"
                >
                {contact.field_contact_phone}
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default ContactPeople;
  
  