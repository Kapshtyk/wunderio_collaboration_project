export function HeadingParagraph({
  children,
}: {
  children: string | JSX.Element;
}) {
  return <h2 className="text-heading-xl font-semibold">{children}</h2>;
}
