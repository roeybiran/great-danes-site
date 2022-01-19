import Base from '../components/BaseScene';
import DefaultMeta from '../components/DefaultMeta';
import styled from 'styled-components';
import HomeScene from '../home-view/HomeScene';

const CanvasContainer = styled.div`
	height: 100vh;
	width: 100%;
`;

export default function Home() {
	return (
		<>
			<DefaultMeta pageTitle={'Home'} />
			<header className="sr-only">
				<h1 className="txt-l">Great Danes</h1>
				<p>a Danish Design Archive</p>
			</header>
			<CanvasContainer>
				<Base>
					<HomeScene />
				</Base>
			</CanvasContainer>
		</>
	);
}
