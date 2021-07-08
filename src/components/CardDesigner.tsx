import styled from 'styled-components/macro';

const StyledListItem = styled.li`
  --max-thumb-width: 80px;
  display: flex;
  align-items: center;

  div {
    position: relative;
    pointer-events: none;
    order: -1;
    transition: opacity 0.2s ease-in;
    transition-delay: 0.3s;
    opacity: 0;
  }

  a:hover + div {
    opacity: 1;
  }

  img {
    max-width: var(--max-thumb-width);
    clip-path: circle(50% at 50% 50%);
    position: absolute;
    transform: translate(-112.5%, -50%);
  }
`;

type DesignerRowProps = {
  name: string;
  imgSrc: string;
};

const DesignerRow = ({ name, imgSrc }: DesignerRowProps) => (
  <StyledListItem>
    <a className="sliding-underline" href="/">
      {name}
    </a>
    <div>
      <img src={imgSrc} alt={name} />
    </div>
  </StyledListItem>
);

export default DesignerRow;
