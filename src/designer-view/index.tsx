import { Center, Stack } from '@roeybiran/every-layout-styled-components';
import { useRef } from 'react';
import styled from 'styled-components';
import BackToTop from '../components/BackToTop';
import DefaultMeta from '../components/DefaultMeta';
import useStagger from '../components/useStagger';
import getProps from './getProps';
import Header from './_internal/Header';
import HeroImage from './_internal/HeroImage';
import HeroQuote from './_internal/HeroQuote';
import ProductCard from './_internal/ProductCard';
import ProductGrid from './_internal/ProductGrid';
import Story from './_internal/Story';
import Summary from './_internal/Summary';

type Props = {
	designer: Awaited<ReturnType<typeof getProps>>;
};

export default function DesignerView({ designer }: Props) {
	const { avatar, hero, name, works, meta, mixedContent, quote } = designer!;
	const wrapperRef = useRef<HTMLDivElement>(null);
	useStagger(wrapperRef);

	return (
		<>
			<DefaultMeta pageTitle={name} />
			<Wrapper ref={wrapperRef}>
				<HeroQuote quote={quote} />
				<HeroImage img={hero} />
				<Center gutters="var(--s0)" max="none">
					<div className="_stack">
						<Stack space="var(--s3)" data-stagger>
							<Header name={name} avatar={hero ? null : avatar} />
							<Stack space="var(--s1)">
								<h2 className="txt-m" id="works">
									Works
								</h2>
								<ProductGrid className="sans" data-stagger>
									{works.map((w) => (
										<li key={w.slug}>
											<ProductCard {...w} />
										</li>
									))}
								</ProductGrid>
							</Stack>
							<Stack space="var(--s1)">
								<h2 className="txt-m">Biography</h2>
								<Summary meta={meta} />
							</Stack>
						</Stack>
						<Story content={mixedContent} />
						<Center>
							<BackToTop />
						</Center>
					</div>
				</Center>
			</Wrapper>
		</>
	);
}

const Wrapper = styled.main`
	._stack > * + * {
		margin-block-start: var(--s3);
	}

	.back-to-top {
		margin-block-end: var(--s3);
	}
`;
