import { Center, Grid, Stack } from '@roeybiran/every-layout-styled-components';
import fs from 'fs';
import { glob } from 'glob';
import Markdown from 'markdown-to-jsx';
import type {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import path, { join } from 'path';
import { useRef } from 'react';
import styled from 'styled-components';
import DefaultMeta from '../../components/DefaultMeta';
import useStagger from '../../components/useStagger';
import { CMS_PATH, UNKNOWN_MODEL } from '../../constants';
import fetchAllItems from '../../lib/fetchAllItems';
import prepareForNextImage from '../../util/prepareForNextImage';
import upperCaseFirst from '../../util/upperCaseFirst';

const craftDir = join(CMS_PATH, 'craft');

const Wrapper = styled.main`
	.img-container {
		position: relative;
	}

	.hero {
		margin-block-start: calc(-1 * (var(--s3)));
		width: 100vw;
		height: 90vh;
	}

	a {
		text-decoration: underline;
	}

	li {
		max-width: max-content;
	}

	.grid {
		justify-items: start;
	}

	.unknown {
		font-style: italic;
	}

	.thumb {
		clip-path: circle(50% at 50% 50%);
	}
`;

export default function CraftTopic({
	title,
	text,
	hero,
	products,
	designers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { blurDataUrl, src } = hero;
	const wrapperRef = useRef(null);
	useStagger(wrapperRef);
	return (
		<>
			<DefaultMeta pageTitle={title} />
			<Wrapper ref={wrapperRef} data-stagger>
				<Stack>
					<div className="img-container hero">
						<Image
							src={src}
							layout="fill"
							blurDataURL={blurDataUrl}
							alt={title}
							placeholder="blur"
							objectFit="cover"
						/>
					</div>
					<Center gutters="var(--s0)">
						<Stack space="var(--s2)" data-stagger>
							<div>
								<div className="drop-cap">
									<Markdown
										options={{
											overrides: {
												h1: function H1({ children }) {
													return (
														<header>
															<h1 className="txt-l">{children}</h1>
														</header>
													);
												},
											},
										}}
									>
										{text}
									</Markdown>
								</div>
							</div>
							<Section title="Designers" items={designers} />
							<Section title="Designs" items={products} />
						</Stack>
					</Center>
				</Stack>
			</Wrapper>
		</>
	);
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const topic = params!.topic as string;
	const base = join(process.cwd(), craftDir, topic);

	const title = upperCaseFirst(topic);
	const hero = await prepareForNextImage(join(base, 'hero.jpg'));
	const text = fs.readFileSync(join(base, 'text.md'), 'utf-8');

	const items = await fetchAllItems();
	const designers = items
		.filter((x) => x.products.some((x) => x.materials.includes(topic)))
		.slice(0, 10);
	const products = items
		.flatMap((x) => x.products)
		.filter((x) => x.materials.includes(topic))
		.slice(0, 10);

	return {
		props: {
			designers,
			products,
			title,
			text,
			hero,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const topicNames = glob
		.sync(join(process.cwd(), craftDir, '**/text.md'))
		.map((p) => ({ params: { topic: p.split(path.sep).slice(-2)[0] } }));

	return {
		paths: topicNames,
		fallback: false,
	};
};

function Section({
	title,
	items,
}: {
	title: string;
	items: InferGetStaticPropsType<typeof getStaticProps>[
		| 'designers'
		| 'products'];
}) {
	return (
		<Stack as="section">
			<h2 className="txt-m">{title}</h2>
			<Grid min="125px" space="var(--s1)" as="ul" className="grid" data-stagger>
				{items.map(({ name, slug, id, thumb }) => (
					<li key={id}>
						<div className="img-container">
							<Image
								className={title !== 'Designs' ? 'thumb' : ''}
								src={thumb.src}
								objectFit="contain"
								width={64}
								height={64}
								placeholder="blur"
								blurDataURL={thumb.blurDataUrl}
								alt={name}
							/>
						</div>
						<Link href={slug + (title === 'Designs' ? '#works' : '')}>
							<a className={name === UNKNOWN_MODEL ? 'unknown' : ''}>{name}</a>
						</Link>
					</li>
				))}
			</Grid>
		</Stack>
	);
}
