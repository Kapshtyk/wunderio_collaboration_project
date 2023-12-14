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
      <div className="h-72 w-[110vw] -translate-x-[25%] rounded-r-2xl bg-gradient-primary-600 bg-right bg-cover bg-no-repeat"></div>
      <div className="relative -mt-72 h-72 w-[75vw] mb-4 pt-14 flex flex-col gap-6 z-40 text-white">
        <HeadingParagraph>{title}</HeadingParagraph>
        <p className="text-xl font-regular">{description}</p>
      </div>
    </>
  );
}
