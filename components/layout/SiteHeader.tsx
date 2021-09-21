import Burger from '@/components/Burger';
import { Center } from '@roeybiran/every-layout-styled-components';
import ROUTES from 'lib/routes';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: var(--bgcolor);
  padding-block-start: var(--s0);
  padding-block-end: var(--s0);
  background: rgba(255, 255, 255, 0);

  a {
    color: var(--danish-red);
    text-decoration: none;
  }

  [aria-current='page'] {
    text-decoration: underline;
  }
`;

export default function SiteHeader() {
  const { pathname } = useRouter();

  return (
    <Wrapper>
      <Center max="none" gutters="var(--s0)">
        <Burger openButtonInnerHtml="GREAT DANES">
          {Object.entries(ROUTES).map(([label, href]) => (
            <li key={label}>
              <Link href={href}>
                <a
                  className="uppercased"
                  aria-current={pathname === href ? 'page' : false}
                >
                  {label}
                </a>
              </Link>
            </li>
          ))}
        </Burger>
      </Center>
    </Wrapper>
  );
}
