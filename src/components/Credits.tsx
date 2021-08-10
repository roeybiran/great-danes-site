import styled from 'styled-components/macro';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .b {
    font-weight: 500;
  }

  .deps {
    margin-top: var(--space12);

    > p {
      margin-bottom: var(--space2);
    }
  }

  > div {
    max-width: 60ch;
  }

  ul {
    list-style: disc inside;
  }

  li {
    text-decoration: underline;
  }
`;

export default function Credits() {
  return (
    <Wrapper>
      <div>
        <div className="credits">
          <p>
            <span className="b"> Design, Development:</span> Roey Biran
          </p>
          <p>
            <span className="b"> Direction:</span> Golan Gafni
          </p>
          <p>Holon Institue of Technology, 2021</p>
        </div>
        <div className="deps">
          <p className="b">
            This project relies on the following open source dependencies:
          </p>
          <ul>
            <li>eslint-import-resolver-typescript</li>
            <li>eslint-plugin-import</li>
            <li>framer-motion</li>
            <li>hamburger-react</li>
            <li>leva</li>
            <li>react</li>
            <li>react-dom</li>
            <li>react-router-dom</li>
            <li>react-scripts</li>
            <li>styled-components</li>
            <li>three</li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}
