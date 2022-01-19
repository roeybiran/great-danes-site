import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchProductsSlugs from '../../../product-view/getPaths';
import fetchSingleProduct from '../../../product-view/getProps';
import ProductView from '../../../product-view';

export default function Product({
	product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return <ProductView product={product} />;
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	const product = await fetchSingleProduct(
		params!.designer as string,
		params!.product as string
	);
	return {
		props: { product },
		notFound: !product,
	};
}

export async function getStaticPaths() {
	const paths = fetchProductsSlugs().map(({ designer, product }) => ({
		params: { designer, product },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}
