import { Fragment } from 'react';
import styled from 'styled-components/macro';

const Aside = styled.aside`
  z-index: 1;
  position: fixed;
  transform: translateY(-50%);
  top: 50%;
  right: var(--bleed);
  text-align: right;
  color: var(--danish-red);

  ul {
    border-radius: var(--space1);
    overflow: hidden;
    display: grid;
    grid-template-columns: max-content max-content;
    > * {
      padding: var(--space4);
    }
  }

  .progress-bar {
    transform: translateX(100%);
    right: 0;
    position: absolute;
    background-color: var(--danish-red);
    height: 10%;
    width: 1%;
  }

  .title {
    pointer-events: none;
  }

  .date {
    background-color: var(--danish-white);
  }

  li {
    :hover {
      text-decoration: underline;
    }
  }
`;

interface Props {
  items: { title: string; date: string }[];
  progress: number;
}

export default function HistoryToC({ items, progress }: Props) {
  return (
    <Aside>
      <div className="progress-bar" style={{ height: `${progress}%` }} />
      <ul>
        {items.map(({ title, date }) => (
          <Fragment key={title}>
            <li className="title">{title}</li>
            <li className="date">{date}</li>
          </Fragment>
          // <li key={title}>
          // </li>
        ))}
      </ul>
    </Aside>
  );
}
