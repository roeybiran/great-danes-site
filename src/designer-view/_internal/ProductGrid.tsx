import styled from 'styled-components';

const ProductGrid = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
	row-gap: var(--s3);
	justify-items: stretch;
`;

export default ProductGrid;
