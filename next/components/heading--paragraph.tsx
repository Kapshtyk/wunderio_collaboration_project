export function HeadingParagraph({
  className,
  children,
}: {
  children: string | JSX.Element;
  className?: string;
}) {
  return <h2 className={className}>{children}</h2>;
}
