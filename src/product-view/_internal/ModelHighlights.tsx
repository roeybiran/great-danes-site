import { Html } from '@react-three/drei';
import { useState } from 'react';
import AnnotationDot from './AnnotationDot';
import AnnotationText from './AnnotationText';

interface Props {
	highlights: ModelHighlight[];
	shown?: boolean;
}

export default function ModelHighlights({ highlights, shown = false }: Props) {
	const [shownFeature, setShownFeature] = useState<number | null>(null);
	return (
		<group>
			{highlights.map((t, i) => (
				<Html
					style={{
						opacity: shown ? 1 : 0,
						transition: 'opacity 0.3s ease 0s',
					}}
					className={`highlight ${shown ? 'shown' : ''}`}
					key={t.text}
					position={t.position}
					scale={t.scale}
				>
					<AnnotationDot
						onClick={() => {
							setShownFeature(shownFeature === i ? null : i);
						}}
					>
						<AnnotationText
							style={{
								opacity: shownFeature === i ? 1 : 0,
							}}
						>
							{t.text}
						</AnnotationText>
					</AnnotationDot>
				</Html>
			))}
			)
		</group>
	);
}
