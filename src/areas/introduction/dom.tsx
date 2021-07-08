import styled from 'styled-components/macro';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  pointer-events: none;
  font-size: var(--font-size-9xl);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  opacity: 0;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  animation: 0.3s ease-out 0.5s 1 normal forwards running fadeIn;

  h1 {
    font-size: var(--font-size-9xl);
    /* font-style: italic; */
  }

  .prose {
    color: black;
    font-family: 'Avenir Next World';
  }

  main > * + * {
    margin-top: var(--flow-gap);
  }
`;

const domContent = (data: string[]) => (
  <Wrapper>
    <div>
      <header>
        <h1>Introduction</h1>
      </header>
      <main>
        {data.map((paragraph, idx) => (
          <p key={paragraph} className="prose" dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </main>
    </div>
  </Wrapper>
);

export default domContent;
