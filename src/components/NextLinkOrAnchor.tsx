import Link from 'next/link';
import ExternalLink from './ExternalLink';

export default function NextLinkOrAnchor({ children, ...props }: any) {
  return props.href.startsWith('/') ? (
    <Link href={props.href}>{children[0]}</Link>
  ) : (
    <ExternalLink href={props.href}>{children}</ExternalLink>
  );
}
