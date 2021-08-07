import styled from 'styled-components/macro';

interface Props {
  item: SearchResultItem;
}

const Wrapper = styled.article`
  img {
    height: 120px;
    width: 120px;
    object-fit: contain;
    filter: grayscale();
    margin: auto;
  }

  .title {
    width: 100%;
    margin-top: calc(var(--flow-gap) * 0.75);
    text-align: center;
  }

  &.designer img {
    clip-path: circle(50% at 50% 50%);
  }

  &.product img {
    padding: 20px;
  }
`;

const CardSearchItem = ({ item }: Props) => {
  return (
    <Wrapper className={item.type}>
      <img alt={item.title} src={item.thumbSrc} />
      <p className="title">{item.title}</p>
    </Wrapper>
  );
};

export default CardSearchItem;
