import Image from "next/image";
import Link from "next/link";

import { Page as PageType } from "@/lib/zod/page";
import { WorkCard } from "@/lib/zod/paragraph";

import { MediaImage } from "./media--image";
import { useTranslation } from "next-i18next";

export function FrontPageWorkSection({ allWorkPages }) {
  const { t } = useTranslation();
  return (
    <div >
      <h1 className="text-heading-md font-bold text-main my-4">{t("frontPage-workTitle")}</h1>
      <div className="mb-12">
        {allWorkPages.slice(0, 1).map((workPage: PageType) => (
          <div key={workPage.id}>
            <div className="flex justify-center items-center p-12 bg-primary-50 h-[450px] rounded-lg">
              {workPage.field_content_elements &&
                workPage.field_content_elements
                  .filter((element) => element.type === "paragraph--work_card")
                  .map((paragraph: WorkCard) => (
                    <div key={paragraph.id}>
                      <Link href={workPage.path.alias}>
                        <div className="relative w-[300px] h-[190px] md:w-[520px] md:h-[300px] flex justify-center overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 animate-fadeIn">

                          <MediaImage
                            className=" h-[300px] w-[240px] md:w-[420px] hover:saturate-150 md:m-auto absolute md:right-[50px] top-[10px]"
                            media={paragraph.field_image}
                          />
                          <Image
                            className="z-20 relative object-contain"
                            src={"/macbook_pro.png"}
                            fill={true}
                            sizes="(max-width: 570px) 50vw, (max-width: 1200px) 100vw, 30vw"
                            alt="macbook pro photo frame"
                            priority
                          ></Image>
                        </div>
                      </Link>
                    </div>
                  ))}
            </div>

            <div>
              <Link href={workPage.path.alias}>
                <h1 className="text-main py-3 text-lg font-bold hover:underline">
                  {workPage.title}
                </h1>
              </Link>
              <p className="text-lg">{workPage.field_excerpt}</p>
            </div>
          </div>
        ))}
      </div>

      <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mb-12 gap-6">
        {allWorkPages.slice(1, 4).map((workPage: PageType) => (
          <div key={workPage.id}>
            <div>
              {workPage.field_content_elements &&
                workPage.field_content_elements
                  .filter((element) => element.type === "paragraph--work_card")
                  .map((paragraph: WorkCard) => (
                    <div key={paragraph.id} className="bg-primary-50 rounded-lg">
                      <Link href={workPage.path.alias}>
                        <div className="relative w-[auto] h-[400px]  flex justify-center overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 animate-fadeIn">
                          <MediaImage
                            className="h-[325px] w-[220px] absolute z-10 top-[75px] hover:saturate-150"
                            media={paragraph.field_image}
                          />
                          <Image
                            className="z-20 relative pt-16 object-contain"
                            src={"/iPhone_X.png"}
                            fill={true}
                            sizes="(max-width: 570px) 50vw, (max-width: 1200px) 100vw, 30vw"
                            alt="iPhone photo frame"
                          ></Image>
                        </div>
                      </Link>

                    </div>
                  ))}
            </div>
            <div>
              <Link href={workPage.path.alias}>
                <h1 className="text-main py-3 text-lg font-bold hover:underline">
                  {workPage.title}
                </h1>
              </Link>
              <p className="text-lg">{workPage.field_excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
