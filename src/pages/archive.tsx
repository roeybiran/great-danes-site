import { InferGetStaticPropsType } from 'next';
import DesignersList from '../designers-list-view/DesignersList';
import getProps from '../designers-list-view/getProps';

export default function Archive({
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return <DesignersList props={data} />;
}

export async function getStaticProps() {
	return {
		props: { data: await getProps() },
	};
}
