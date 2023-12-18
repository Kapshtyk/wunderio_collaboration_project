import { HeadingParagraph } from "./heading--paragraph";

export function HeadingPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <div className="bg-gradient-primary-600 py-4 2sm:py-6 md:py-8 lg:py-10 xl:py-12 min-h-[280px] w-[110vw] -translate-x-[25%] rounded-r-2xl  flex flex-col align-middle justify-center">
        <div className="w-[70vw] ml-[25%]">
          <HeadingParagraph className="text-white">{title}</HeadingParagraph>
          <p className="text-white">{description}</p>
        </div>
      </div>
    </>
  );
}
