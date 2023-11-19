import { HeadingSection, SubHeadingSection } from "@/lib/zod/paragraph";
import { Services as ServicesType} from "@/lib/zod/services";
import Link from "next/link";


interface ServicesTypesProps {
  servicesTypes: ServicesType [];
  allServices: ServicesType;
}

const  ServicesTypes = ({ servicesTypes ,allServices}: ServicesTypesProps) => {
    console.log("all servicex:",allServices)
    console.log("services:", servicesTypes)
    const subHeadingSections = allServices.field_content_elements.filter((field)=> field.type === "paragraph--sub_heading_section") as SubHeadingSection [];
    return (
    <>
      <div className="grid gap-4">
        {subHeadingSections.map((subHeadingSection) => (
          <div key={subHeadingSection.id}>
           {(
              <div>
                <p>{subHeadingSection.field_heading}</p>
                <p>{subHeadingSection.field_excerpt}</p>
               {servicesTypes.filter((field)=>field.field_service_types.name  === subHeadingSection.field_heading).map((service)=>(
                <div key={service.id}>
                    <Link 
                    href={service.path.alias}
                    className="text-primary-600">
                    {service.title}
                    </Link>
                </div>
               ))}
              </div>
            )}  
          </div>
        ))}
      </div>
    </>   
  )}

export default ServicesTypes;