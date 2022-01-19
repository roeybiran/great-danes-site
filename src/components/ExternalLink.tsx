export default function ExternalLink({
  children,
  href,
}: {
  children: string;
  href: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
