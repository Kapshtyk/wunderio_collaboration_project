import Link from "next/link";
import { Page as PageType } from "@/lib/zod/page";
import { WorkCard } from "@/lib/zod/paragraph";
import { MediaImage } from "./media--image";

export function FrontPageWorkSection({ allWorkPages }) {
    return (
        <div >
            {/* First Row */}
            <h1 className="text-heading-md font-bold text-main mb-4">Our Work</h1>
            <div className="mb-12">
                {allWorkPages.slice(0, 1).map((workPage: PageType) => (
                    <div>
                        <div key={workPage.id} className="flex justify-center items-center p-12 bg-primary-50 h-[450px] rounded-lg">
                            {workPage.field_content_elements &&
                                workPage.field_content_elements
                                    .filter((element) => element.type === "paragraph--work_card")
                                    .map((paragraph: WorkCard) => (
                                        <div key={paragraph.id}>
                                            <Link href={workPage.path.alias}>
                                                <div className="relative w-[300px] md:w-[520px] md:h-[300px] flex justify-center overflow-hidden">

                                                    <MediaImage
                                                        className=" h-[300px] w-[240px] md:w-[420px] hover:saturate-150 md:m-auto absolute md:right-[50px] top-[10px]"
                                                        media={paragraph.field_image}
                                                    />
                                                    <img
                                                        className="z-10 relative"
                                                        src={"/macbook_pro.png"}
                                                        width={600}
                                                        height={450}
                                                        alt="macbookpro photo frame"
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                        </div>

                        <div>
                            <Link href={workPage.path.alias}>
                                <h1 className="text-primary-600 py-3 text-lg font-bold hover:underline">
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
                    <div>
                        <div key={workPage.id}>
                            {workPage.field_content_elements &&
                                workPage.field_content_elements
                                    .filter((element) => element.type === "paragraph--work_card")
                                    .map((paragraph: WorkCard) => (
                                        <div key={paragraph.id} className="bg-primary-50 rounded-lg">
                                            <Link href={workPage.path.alias}>
                                                <div className="relative w-[auto] h-[400px]  flex justify-center overflow-hidden pt-16" >
                                                    <MediaImage
                                                        className="h-[430px] w-[220px] absolute z-10 top-[78px] hover:saturate-150"
                                                        media={paragraph.field_image}
                                                    />
                                                    <img
                                                        className="z-20 relative"
                                                        src={"/iPhone_X.png"}
                                                        width={250}
                                                        height={500}
                                                        alt="iPhone photo frame"
                                                    ></img>


                                                </div>
                                            </Link>

                                        </div>
                                    ))}
                        </div>
                        <div>
                            <Link href={workPage.path.alias}>
                                <h1 className="text-primary-600 py-3 text-lg font-bold hover:underline">
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





