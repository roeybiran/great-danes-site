import styled from "styled-components";

const Button = styled.button`
  stroke: var(--danish-red);
  stroke-width: 24px;
  fill: none;
`;

const SearchButton = () => {
  return (
    <Button>
      <svg width="24" viewBox="-10 -10 306 314">
        <circle cx="128" cy="128" r="125" />
        <line x1="213" y1="220" x2="303" y2="311" />
      </svg>
    </Button>
  );
};

export default SearchButton;
