import styled from 'styled-components/macro';
import SlidingUnderline from 'styled/SlidingUnderline';

const StyledListItem = styled.li`
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
    max-width: 80px;
    clip-path: circle(50% at 50% 50%);
    position: absolute;
    transform: translate(-112.5%, -50%);
  }
`;

type DesignerRowProps = {
  name: string;
  imgSrc: string;
  slug: string;
};

const DesignerRow = ({ name, imgSrc, slug }: DesignerRowProps) => (
  <StyledListItem data-designer={name}>
    <SlidingUnderline to={slug}>{name}</SlidingUnderline>
    <div>
      <img src={imgSrc} alt={name} />
    </div>
  </StyledListItem>
);

export default DesignerRow;
