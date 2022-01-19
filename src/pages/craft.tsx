import { Center, Stack } from '@roeybiran/every-layout-styled-components';
import fs from 'fs';
import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { join } from 'path';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import DefaultMeta from '../components/DefaultMeta';
import useStagger from '../components/useStagger';
import { CMS_PATH, COMING_SOON, READ_MORE } from '../constants';
import getPublicPath from '../util/getPublicPath';
import readdir from '../util/readdir';
import upperCaseFirst from '../util/upperCaseFirst';

const craftDir = join(CMS_PATH, 'craft');

export default function Page({
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const [currentVid, setCurrentVid] = useState<string | null>(null);

	const wrapperRef = useRef(null);
	useStagger(wrapperRef);

	return (
		<>
			<DefaultMeta pageTitle="Craft" />
			<Wrapper ref={wrapperRef} className="sans">
				{data.map(({ video, poster }) => (
					<div
						key={video}
						className={`vid-wrapper ${currentVid === video ? 'vid-shown' : ''}`}
					>
						<video poster={poster} playsInline muted loop autoPlay>
							<source src={video} type="video/mp4" media="(hover: hover)" />
						</video>
					</div>
				))}
				<Center
					className={currentVid ? 'vid-shown' : ''}
					data-stagger
					as="main"
					gutters="var(--s0)"
					max="none"
				>
					<header>
						<h1 className="txt-l">Craft</h1>
					</header>

					<Stack as="ul" data-stagger>
						{data.map(({ topic, isReady, video }) => (
							<Stack
								key={topic}
								as="li"
								space="var(--s-2)"
								className="txt-m"
								onMouseEnter={() => {
									setCurrentVid(video);
								}}
								onMouseOut={() => {
									setCurrentVid(null);
								}}
							>
								{isReady ? (
									<Link href={`/craft/${topic.toLowerCase()}`}>
										<a>{topic}</a>
									</Link>
								) : (
									<>
										<p>{topic}</p>
									</>
								)}
								<p className="subtitle serif">
									{isReady ? READ_MORE : COMING_SOON}
								</p>
							</Stack>
						))}
					</Stack>
				</Center>
			</Wrapper>
		</>
	);
}

const Wrapper = styled.div`
	p,
	a {
		line-height: 1;
	}

	.vid-wrapper {
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		transition: opacity 0.3s ease 0s;
		opacity: 0;
		z-index: -1;
	}

	li {
		max-width: max-content;
	}

	.vid-wrapper.vid-shown {
		opacity: 1;
	}

	main * {
		transition: color 0.3s ease 0s;
	}

	main.vid-shown {
		h1,
		p:not(.subtitle),
		a {
			color: white;
		}
	}

	.topic:hover {
		text-decoration: underline;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.subtitle {
		font-size: var(--s0);
		font-style: italic;
		color: var(--danish-red);
	}
`;

export const getStaticProps = async () => {
	const base = join(process.cwd(), craftDir);
	const data = readdir(base)
		.map((x) => ({
			topic: upperCaseFirst(x),
			video: getPublicPath(join(craftDir, x, 'vid.mp4')),
			poster: getPublicPath(join(craftDir, x, 'poster.jpg')),
			isReady: fs.existsSync(join(base, x, 'text.md')),
		}))
		// @ts-ignore
		.sort((a, b) => {
			if (a.isReady && !b.isReady) return -1;
		});
	return {
		props: {
			data,
		},
	};
};
