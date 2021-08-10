import styled from 'styled-components/macro';

const Img = styled.img`
  height: 100vh;
  width: 100%;
  object-fit: cover;
  filter: grayscale();

  border-bottom-width: 1px;
  border-color: var(--background-color);
`;

interface Props {
  id: string;
  src: string;
  alt: string;
}

export default function Hero({ id, src, alt }: Props) {
  return (
    <figure className="designer-hero" id={id}>
      <Img src={src} alt={alt} />
    </figure>
  );
}
