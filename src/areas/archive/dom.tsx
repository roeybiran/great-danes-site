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

// function parseDesignersToColumns(designers: Designer[]) {
//   return Array.from(new Set(designers.map((n) => n.lastName[0])))
//     .sort()
//     .map((indexLetter) => ({
//       indexLetter,
//       designers: designers.filter((d) => d.lastName[0] === indexLetter).sort(),
//     }));
// }

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  pointer-events: none;
  font-size: var(--font-size-9xl);
`;

interface Props {
  data: Designer[];
}

export default function DesignersGrid({ data: designers }: Props) {
  // const columns = parseDesignersToColumns(designers);
  return (
    <Wrapper>
      <ul>
        {designers.map(({ thumbSrc, id, firstName, lastName }) => (
          <li key={id}>
            {firstName} {lastName}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
