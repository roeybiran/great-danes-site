import { Center, Grid, Stack } from '@roeybiran/every-layout-styled-components';
import Link from 'next/link';
import styled from 'styled-components';
import getProps from './getProps';
import DefaultMeta from '../components/DefaultMeta';

export default function DesignersList({
	props,
}: {
	props: Awaited<ReturnType<typeof getProps>>;
}) {
	return (
		<>
			<DefaultMeta pageTitle="Archive" />
			<Wrapper>
				<Center gutters="var(--s0)" max="none">
					<header>
						<h1 className="txt-l fade-slide-up">Archive</h1>
					</header>
					<main>
						<Grid className="grid">
							{props.map(([letter, names], idx) => (
								<div
									className="fade-slide-up"
									key={letter}
									style={{
										animationDelay: `${idx * 0.1}s`,
									}}
								>
									<h2 className="txt-m">{letter}</h2>
									<Stack as="ul" space="var(--s-3)" role="list">
										{names.map(({ name, slug }) => (
											<li key={name}>
												<Link href={slug}>{name}</Link>
											</li>
										))}
									</Stack>
								</div>
							))}
						</Grid>
					</main>
				</Center>
			</Wrapper>
		</>
	);
}
const Wrapper = styled.div`
	.grid {
		row-gap: var(--s2);
	}

	h2 {
		font-size: unset;
		margin-bottom: var(--s-1);
		font-weight: 500;
	}

	a:hover {
		text-decoration: underline;
	}
`;
