import { ContactPerson } from "@/lib/zod/contact-person";

interface ContactPeopleProps{
    contactPerson: ContactPerson []
  }
const ContactPeople = ({ contactPerson }: ContactPeopleProps) => {
    console.log("contact", contactPerson);
    

  return (
    <>
        <div>
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
