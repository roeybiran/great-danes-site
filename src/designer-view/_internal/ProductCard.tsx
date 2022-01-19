import { Stack } from '@roeybiran/every-layout-styled-components';
import { READ_MORE, UNKNOWN_MODEL } from '../../constants';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

interface Props {
	name: string | null;
	isReady: boolean;
	slug: string;
	id: string;
	thumb: {
		src: string;
		blurDataUrl: string;
	};
	nickname: string;
}

export default function ProductCard({
	nickname,
	thumb,
	id,
	isReady,
	name,
	slug,
}: Props) {
	return (
		<Wrapper>
			<Stack>
				<div className={`img-container${isReady ? '' : ' read-more'}`}>
					<Image
						alt={name ?? id}
						src={thumb.src}
						width={72}
						height={72}
						objectFit="contain"
						blurDataURL={thumb.blurDataUrl}
						placeholder="blur"
					/>
				</div>
				<div>
					<p className={name ? 'title uppercased' : 'unknown'}>
						{name ?? UNKNOWN_MODEL}
					</p>
					{nickname && <p className="nickname serif">the {nickname}</p>}
					{isReady && (
						<p className="read-more uppercased">
							<Link href={slug}>
								<a>{READ_MORE}</a>
							</Link>
						</p>
					)}
				</div>
			</Stack>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	.img-container.read-more {
		filter: grayscale();
	}

	p {
		margin: 0;
	}

	p.read-more {
		color: var(--danish-red);
		font-size: 0.75em;
		letter-spacing: 2px;
		font-weight: 500;
	}

	.title {
		font-weight: 500;
	}

	.unknown,
	.nickname {
		font-style: italic;
	}
`;
