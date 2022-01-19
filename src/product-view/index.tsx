import { Center, Stack } from '@roeybiran/every-layout-styled-components';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import { useRef } from 'react';
import styled from 'styled-components';
import BackToTop from '../components/BackToTop';
import BaseScene from '../components/BaseScene';
import DefaultMeta from '../components/DefaultMeta';
import useStagger from '../components/useStagger';
import { UNKNOWN_MODEL } from '../constants';
import ProductGallery from './_internal/ProductGallery';
import models from './_internal/Models';
import Scene from './_internal/ProductScene';
import Summary from './_internal/Summary';
import Videos from './_internal/Videos';

export default function ProductView({ product }: any) {
	const { name, nickname, content, videos, gallery, id } = product!;

	const wrapperRef = useRef(null);
	useStagger(wrapperRef, false);

	return (
		<>
			<DefaultMeta pageTitle={name ?? UNKNOWN_MODEL} />
			<CanvasContainer>
				<div className="inner">
					{models[id] && (
						<BaseScene>
							<Scene>{models[id](true)}</Scene>
						</BaseScene>
					)}
				</div>
				<div>
					<Link href="#header">
						<a className="txt-m">Info</a>
					</Link>
				</div>
			</CanvasContainer>
			<Wrapper ref={wrapperRef}>
				<Center max="none" gutters="var(--s0)">
					<header id="header" data-stagger>
						<h1 className="txt-l">{name ?? UNKNOWN_MODEL}</h1>
						{nickname && <p className="nickname">the {nickname}</p>}
					</header>
					<Stack space="var(--s3)">
						<div className="content">
							<aside>
								<Summary {...product!} />
							</aside>
							<Markdown className="drop-cap" data-stagger>
								{content}
							</Markdown>
						</div>
						{gallery.length ? <ProductGallery gallery={gallery} /> : null}
						<Videos videos={videos} />
						<BackToTop />
					</Stack>
				</Center>
			</Wrapper>
		</>
	);
}

const CanvasContainer = styled.div`
	margin-block-start: calc(-1 * (var(--s3)));
	width: 100%;
	height: 100vh;

	display: flex;
	flex-direction: column;

	> * {
		flex: auto;
	}

	a {
		flex-wrap: wrap;
		gap: var(--s1);
		margin-inline-start: var(--s1);
		margin-block-end: var(--s1);
		text-decoration: underline;
	}
`;

const Wrapper = styled.main`
	.content,
	header {
		display: flex;
		flex-wrap: wrap;
	}

	header {
		align-items: baseline;
		gap: var(--s0);
	}

	.content {
		gap: var(--s2);
	}

	.nickname {
		font-size: var(--s2);
		font-style: italic;
	}

	dl a {
		text-decoration: underline;
	}

	h2 {
		margin-block-end: var(--s0);
	}
`;
