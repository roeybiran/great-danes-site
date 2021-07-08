import styled, { keyframes } from 'styled-components/macro';

const Button = styled.button`
  svg {
    transition: transform 0.3s ease;
  }
  svg:hover {
    transform: translateY(-20%);
  }
`;

export default function SearchButton() {
  return (
    <Button>
      <svg
        width="24"
        viewBox="-10 -10 306 314"
        fill="none"
        strokeWidth="16"
        stroke="#C8282C"
      >
        <circle cx="128" cy="128" r="125" />
        <line x1="213.121" y1="220.879" x2="303.631" y2="311.388" />
      </svg>
    </Button>
  );
}
