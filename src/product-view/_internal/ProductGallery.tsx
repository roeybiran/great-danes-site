import { Reel } from '@roeybiran/every-layout-styled-components';
import Image from 'next/image';

interface Props {
	gallery: CustomImage[];
}

export default function ProductGallery({ gallery }: Props) {
	return (
		<>
			<h2>Gallery</h2>
			<Reel height="80vh" itemWidth="auto" space="var(--s1)">
				{gallery.map((i) => (
					<Image
						key={i.src}
						width={i.width}
						height={i.height}
						src={i.src}
						alt={i.alt}
						placeholder="blur"
						blurDataURL={i.blurDataUrl}
						objectFit="contain"
					/>
				))}
			</Reel>
		</>
	);
}
