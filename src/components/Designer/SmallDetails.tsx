import styled from 'styled-components/macro';
import uniqified from 'util/uniqified';
import upperCaseFirst from 'util/upperCaseFirst';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(280px, 100%), max-content)
  );
  gap: calc(2 * var(--flow-gap));

  a {
    text-decoration: underline;
  }

  div > *:first-child {
    margin-bottom: var(--space1);
    font-weight: var(--font-weight-md);
  }

  li > span {
    font-style: italic;
  }
`;

const Awards = styled.div`
  ul {
    list-style: disc inside;
  }
  li {
    padding-left: var(--space1);
  }
`;

interface Props {
  designer: Designer;
}

export default function SmallDetails({ designer }: Props) {
  const brands = uniqified(designer.works.map((x) => x.brand).filter((x) => x));
  return (
    <Container>
      {designer.birthPlace && (
        <div>
          <p>Birthplace</p>
          <p>{designer.birthPlace}</p>
        </div>
      )}
      {designer.restingPlace && (
        <div>
          <p>Resting Place</p>
          <a href="/">{designer.restingPlace}</a>
        </div>
      )}
      {designer.education.length > 0 && (
        <div>
          <p>Education</p>
          <ul>
            {designer.education.map((x) => (
              <li key={x}>
                <a href="/">{x}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {designer.spouses.length > 0 && (
        <div>
          <p>Spouse{designer.spouses.length > 1 && 's'}</p>
          <ul>
            {designer.spouses.map((x) => (
              <li key={x.name + x.info}>
                {x.name} / <span>{x.info}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {designer.children.length > 0 && (
        <div>
          <p>Children</p>
          <ul>
            {designer.children.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      )}
      {designer.awards.length > 0 && (
        <Awards>
          <p>Awards</p>
          <ul>
            {designer.awards.map((x) => (
              <li key={x.name + x.date}>
                {x.name} / <span>{x.date}</span>
              </li>
            ))}
          </ul>
        </Awards>
      )}
      {brands.length > 0 && (
        <div>
          <p>Associated Brands</p>
          <ul>
            {brands.sort().map((b) => (
              <li key={b}>
                <a href="/">{b}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <p>Specialities</p>
        <ul>
          {uniqified(
            designer.works.flatMap((x) => [...x.materials, ...x.categories])
          ).map((b) => (
            <li key={b}>
              <a href="/">{upperCaseFirst(b)}</a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
