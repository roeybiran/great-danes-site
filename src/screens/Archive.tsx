import styled from 'styled-components/macro';
import DesignerCard from 'components/CardDesigner';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, max-content);
  justify-content: space-around;
  grid-column-gap: var(--space8);
  grid-row-gap: var(--space16);

  margin-top: var(--after-navbar-gap);
  margin-bottom: var(--after-navbar-gap);

  padding-left: var(--bleed);
  padding-right: var(--bleed);

  .column {
    transform: translateY(10%);
    opacity: 0;
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

const Archive = ({ data }: Props) => {
  const columns = parseDesignersToColumns(data);
  return (
    <>
      <Grid>
        {columns.map(({ indexLetter, designers }, idx) => (
          <div
            className="column fade-slide"
            key={indexLetter}
            style={{ animationDelay: `${0.1 * idx}s` }}
          >
            <h3>{indexLetter}</h3>
            <ul>
              {designers.map(
                ({
                  avatarSrc: thumbSrc,
                  designerId: id,
                  firstName,
                  lastName,
                }) => (
                  <DesignerCard
                    key={id}
                    slug={`/archive/${id}`}
                    name={`${firstName} ${lastName}`}
                    imgSrc={thumbSrc}
                  />
                )
              )}
            </ul>
          </div>
        ))}
      </Grid>
    </>
  );
};

export default Archive;

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
