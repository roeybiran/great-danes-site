import { Center } from '@roeybiran/every-layout-styled-components';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import styled from 'styled-components';
import ROUTES from '../routes';
import Burger from './Burger';

export default function SiteHeader() {
	const { pathname } = useRouter();

	return (
		<Wrapper>
			<Center max="none" gutters="var(--s0)">
				<Burger>
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

const Wrapper = styled.header`
	padding-block: var(--s0);
	z-index: 1;
	block-size: max-content;

	[aria-current='page'] {
		font-weight: 500;
	}

	[aria-current='page']::before {
		content: '> ';
	}

	a {
		color: var(--danish-red);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
`;
