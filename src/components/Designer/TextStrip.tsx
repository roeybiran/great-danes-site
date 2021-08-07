import styled from 'styled-components/macro';

const Container = styled.div`
  header {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--space4);
  }

  h2 {
    font-size: var(--font-size-6xl);
    margin-bottom: calc(2 * var(--flow-gap));
  }

  h3 {
    font-weight: var(--font-weight-md);
  }

  blockquote {
    padding-left: 1rem;
    border-left-width: 8px;
    border-left-color: var(--danish-red);
  }

  > * + * {
    margin-top: var(--flow-gap);
  }
`;

interface Props {
  section: ChronologicContentSection;
  sectionIndex: number;
}
export default function TextStrip({ section, sectionIndex }: Props) {
  return (
    <Container>
      <header>
        {sectionIndex === 0 && <h2>Biography</h2>}
        <p>{section.date}</p>
        <h3 id={section.header}>{section.header}</h3>
      </header>
      {section.text.map((text, paragraphIdx) => {
        const props = {
          key: text,
          dangerouslySetInnerHTML: {
            __html: text,
          },
          className:
            'prose' + (sectionIndex + paragraphIdx === 0 ? ' drop-cap' : ''),
        };
        return text.startsWith('<blockquote>') ? (
          <figure {...props} />
        ) : (
          <p {...props} />
        );
      })}
    </Container>
  );
}
