import Link from "next/link";

import { SubHeadingSection } from "@/lib/zod/paragraph";
import { Services as ServicesType } from "@/lib/zod/services";
import AdvisoryIcon from '@/styles/icons/advisory.svg';
import DesignDataIcon from '@/styles/icons/design-data.svg';
import DeliveringDigitalIcon from '@/styles/icons/delivering-digital.svg';

interface ServicesTypesProps {
  servicesTypes: ServicesType[];
  allServices: ServicesType;
}

const ServicesFrontPage = ({ servicesTypes, allServices }: ServicesTypesProps) => {
  const subHeadingSections = allServices.field_content_elements.filter(
    (field) => field.type === "paragraph--sub_heading_section",
  ) as SubHeadingSection[];
  return (
    <>
      <section className="items-center bg-primary-50 flex flex-col justify-center px-16 py-12 max-md:px-5">
        <div className="flex w-full max-w-[1216px] flex-col items-stretch my-8 max-md:max-w-full">
            <h2 className="text-primary-700 text-center text-heading-lg font-semibold leading-[60px] tracking-tighter whitespace-nowrap max-md:max-w-full max-md:text-4xl max-md:leading-[56px]">This is What we do</h2>
            <div className="mt-16 max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        {subHeadingSections.map((subHeadingSection) => (
          <div key={subHeadingSection.id} className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0 transition-transform duration-300 ease-in-out transform hover:scale-105 animate-fadeIn">
            <div className="items-stretch self-stretch bg-white flex w-full grow flex-col mx-auto pt-6 pb-12 px-6 rounded-lg max-md:mt-8 max-md:px-5">
            <div className="flex items-center self-stretch gap-4">
                {subHeadingSection.field_heading === "Advisory" &&
                    <AdvisoryIcon className="h-10 w-10"/>}
                {subHeadingSection.field_heading === "Design & Data" &&
                    <DesignDataIcon className="h-10 w-10"/>}
                {subHeadingSection.field_heading === "Delivering Digital" &&
                    <DeliveringDigitalIcon className="h-10 w-10"/>}
                <p className="text-accent-hugs uppercase"> 
                  {subHeadingSection.field_heading}
                </p>
            </div>
            <div className="bg-steelgray shrink-0 h-px mt-6" />
                <p className="mt-6 mb-6">{subHeadingSection.field_excerpt}</p>
                {servicesTypes
                  .filter(
                    (field) =>
                      field.field_service_types?.name ===
                      subHeadingSection.field_heading,
                  )
                  .map((service) => (
                    <div key={service.id} className="mt-2">
                      <Link
                        href={service.path.alias}
                        className="text-primary-700 hover:underline"
                      >
                        {service.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
        ))}
        </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default ServicesFrontPage;

function MyComponent(props) {
    return (
      <div className="items-center bg-violet-50 flex flex-col justify-center px-16 py-12 max-md:px-5">
        <div className="flex w-full max-w-[1216px] flex-col items-stretch my-8 max-md:max-w-full">
          <div className="text-violet-700 text-center text-5xl font-bold leading-[60px] tracking-tighter whitespace-nowrap max-md:max-w-full max-md:text-4xl max-md:leading-[56px]">
            This is What we do
          </div>
          <div className="mt-16 max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                <div className="items-stretch self-stretch bg-white flex w-full grow flex-col mx-auto pt-6 pb-12 px-6 rounded-lg max-md:mt-8 max-md:px-5">
                  <div className="items-stretch flex justify-between gap-4">
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="aspect-square object-contain object-center w-16 justify-center items-center overflow-hidden shrink-0 max-w-full"
                    />
                    <div className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
                      <div className="text-zinc-800 text-xl font-semibold leading-7 whitespace-nowrap">
                        Advisory
                      </div>
                      <div className="text-violet-700 text-sm font-medium leading-5 whitespace-nowrap">
                        Services -&gt; Advisory
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-300 shrink-0 h-px mt-6" />
                  <div className="text-zinc-600 text-base leading-6 mt-6">
                    We help to define your company’s digital vision and
                    aspirations, guiding you on your way to digital success.
                  </div>
                  <div className="text-violet-700 text-sm font-medium leading-5 mt-6">
                    Stradegies for digital
                  </div>
                  <div className="text-violet-700 text-sm font-medium leading-5 mt-2 mb-1.5">
                    Trainings & coaching
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="items-stretch bg-white flex w-full grow flex-col mx-auto p-6 rounded-lg max-md:mt-8 max-md:px-5">
                  <div className="items-stretch flex justify-between gap-4">
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="aspect-square object-contain object-center w-16 justify-center items-center overflow-hidden shrink-0 max-w-full"
                    />
                    <div className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
                      <div className="text-zinc-800 text-xl font-semibold leading-7 whitespace-nowrap">
                        Design & Data
                      </div>
                      <div className="text-violet-700 text-sm font-medium leading-5 whitespace-nowrap">
                        Services -&gt; Design & Data
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-300 shrink-0 h-px mt-6" />
                  <div className="text-zinc-600 text-base leading-6 mt-6">
                    Together we can build the best possible solutions with the
                    help of design and data.
                  </div>
                  <div className="text-violet-700 text-sm font-medium leading-5 mt-6">
                    Concept design
                  </div>
                  <div className="text-violet-700 text-sm font-medium leading-5 mt-2">
                    Digital product design
                  </div>
                  <div className="text-violet-700 text-sm font-medium leading-5 mt-2">
                    Accessibility
                  </div>
                  <div className="text-violet-700 text-sm font-medium leading-5 mt-2">
                    Analytics
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="items-stretch self-stretch bg-white flex w-full grow flex-col mx-auto pt-6 pb-12 px-6 rounded-lg max-md:mt-8 max-md:px-5">
                  <div className="items-stretch flex justify-between gap-4">
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="aspect-square object-contain object-center w-16 justify-center items-center overflow-hidden shrink-0 max-w-full"
                    />
                    <div className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
                      <div className="text-zinc-800 text-xl font-semibold leading-7 whitespace-nowrap">
                        Delivering Digital
                      </div>
                      <div className="text-violet-700 text-sm font-medium leading-5 whitespace-nowrap">
                        Services -&gt; Delivering Digital
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-300 shrink-0 h-px mt-6" />
                  <div className="text-zinc-600 text-base leading-6 mt-6">
                    Creation, continuous development and constant support of your
                    digital services.
                  </div>
                  <div className="text-violet-700 text-sm font-medium leading-5 mt-6">
                    Development
                  </div>
                  <div className="text-violet-700 text-sm font-medium leading-5 mt-2 mb-8">
                    Lifecycle services
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  