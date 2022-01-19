import { Stack } from '@roeybiran/every-layout-styled-components';
import Link from 'next/link';
import ExternalLink from '../../components/ExternalLink';
import type fetchSingleProduct from '../getProps';
import upperCaseFirst from '../../util/upperCaseFirst';

type Props = NonNullable<Fulfilled<ReturnType<typeof fetchSingleProduct>>>;

export default function Summary(props: Props) {
	const {
		designer,
		date,
		manufacturer,
		url,
		categories,
		dimensions,
		materials,
	} = props;
	return (
		<Stack as="dl" data-stagger>
			<div>
				<dt>Design</dt>
				<dd>
					<Link href={`/archive/${designer.slug}`}>
						<a>{designer.name}</a>
					</Link>
					, {date}
				</dd>
			</div>
			{manufacturer && (
				<div>
					<dt>Production</dt>
					<dd>
						{url ? (
							<ExternalLink href={url}>{manufacturer}</ExternalLink>
						) : (
							manufacturer
						)}
					</dd>
				</div>
			)}
			{dimensions && (
				<div>
					<dt>Dimensions</dt>
					<dd>{dimensions}</dd>
				</div>
			)}
			<div>
				<dt>Type</dt>
				{categories.map((x) => (
					<dd key={x}>{upperCaseFirst(x)}</dd>
				))}
			</div>
			<div>
				<dt>Materials</dt>
				{materials.map((x) => (
					<dd key={x}>
						<Link href="/craft">
							<a>{upperCaseFirst(x)}</a>
						</Link>
					</dd>
				))}
			</div>
		</Stack>
	);
}
