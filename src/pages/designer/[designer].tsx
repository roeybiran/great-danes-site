import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import DesignerView from '../../designer-view';
import getPaths from '../../designer-view/getPaths';
import getProps from '../../designer-view/getProps';

export default function Designer({
	designer,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return <DesignerView designer={designer} />;
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
	return {
		props: {
			designer: await getProps(params?.designer as string),
		},
	};
}

export async function getStaticPaths() {
	const paths = (await getPaths()).map((p) => ({
		params: { designer: p },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}
