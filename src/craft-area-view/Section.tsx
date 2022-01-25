import { Grid, Stack } from '@roeybiran/every-layout-styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { UNKNOWN_MODEL } from '../constants';

type Props = {
	title: string;
	items: {
		name: string;
		slug: string;
		id: string;
		thumb: {
			src: string;
			blurDataUrl: string;
		};
	}[];
};

export default function Section({ title, items }: Props) {
	return (
		<Stack as="section">
			<h2 className="txt-m">{title}</h2>
			<Grid min="125px" space="var(--s1)" as="ul" className="grid" data-stagger>
				{items.map(({ name, slug, id, thumb }) => (
					<li key={id}>
						<div className="img-container">
							<Image
								className={title === 'Designs' ? '' : 'thumb'}
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
