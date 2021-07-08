import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: var(--after-navbar-gap);
  padding-left: var(--bleed);
  padding-right: var(--bleed);

  main {
    display: grid;
    gap: var(--space8);
    grid-template-columns: repeat(auto-fill, 280px);
    grid-auto-rows: 280px;
  }

  img {
    height: 280px;
    width: 280px;
    object-fit: cover;
  }
`;

export default function Craft({ data }: { data: CraftItem[] }) {
  return (
    <Wrapper>
      <header>
        <h1>Craft</h1>
      </header>
      <main>
        {data.map((d) => (
          <article key={d.id}>
            <p>{d.name}</p>
            <img alt="" src={d.img} />
          </article>
        ))}
      </main>
    </Wrapper>
  );
}
