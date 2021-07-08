import styled, { keyframes } from 'styled-components/macro';
import Card from 'components/CardDesigner';

// const radios = [
//   "None",
//   "Wood",
//   "Leather",
//   "Metal",
//   "Seating",
//   "Tables",
//   "Storage",
//   "Accessories",
//   "Lighting",
// ].map((criterion, idx) => (
//   <Fragment key={criterion}>
//     <input
//       type="radio"
//       name="product_filter"
//       id={criterion}
//       value={criterion}
//       defaultChecked={idx === 0}
//     />
//     <label htmlFor={criterion}>{criterion}</label>
//   </Fragment>
// ));

const fadeSlideIn = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Grid = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr)); */
  grid-template-columns: repeat(5, max-content);
  justify-content: space-around;
  grid-column-gap: var(--space8);
  grid-row-gap: var(--space16);

  margin-top: var(--after-navbar-gap);
  padding-left: var(--bleed);
  padding-right: var(--bleed);

  .column {
    transform: translateY(10%);
    opacity: 0;
    animation: 0.8s ease-out 0s 1 normal forwards running ${fadeSlideIn};
  }

  .column h3 {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--space8);
    /* line-height: var(--line-height-4xl); */
    /* padding: var(--space8) 0; */
  }
`;

function parseDesignersToColumns(designers: Designer[]) {
  return Array.from(new Set(designers.map((n) => n.lastName[0])))
    .sort()
    .map((indexLetter) => ({
      indexLetter,
      designers: designers.filter((d) => d.lastName[0] === indexLetter).sort(),
    }));
}

interface Props {
  data: Designer[];
}

export default function DesignersGrid({ data: designers }: Props) {
  const columns = parseDesignersToColumns(designers);
  return (
    <Grid>
      {columns.map(({ indexLetter, designers }, idx) => (
        <div
          className="column"
          key={indexLetter}
          style={{ animationDelay: `${0.6 + idx / 10}s` }}
        >
          <h3>{indexLetter}</h3>
          <ul>
            {designers.map(({ thumbSrc, id, firstName, lastName }) => (
              <Card
                name={`${firstName} ${lastName}`}
                key={id}
                imgSrc={thumbSrc}
              />
            ))}
          </ul>
        </div>
      ))}
    </Grid>
  );
}
