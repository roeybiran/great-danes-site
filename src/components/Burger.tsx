import React, { isValidElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  * {
    box-sizing: border-box;
  }

  button {
    z-index: 1;
    position: relative;
    color: var(--danish-red);
    display: block;
    padding: 0;
    margin: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    font-weight: 500;
  }

  ul {
    width: max-content;
    position: absolute;
    margin: 0;
    top: 0;
    left: 0;
    height: 100vh;
    list-style: none;

    padding: var(--s0);
    padding-block-start: calc(var(--s0) * 3);
    background-color: white;
    border-inline-end: 1px solid var(--danish-red);
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    transition: transform 0.3s ease 0s;
    transition-property: transform, visibility;
    will-change: transform, visibility;
    transform: translateX(-100%);
    visibility: hidden;
  }

  ul > * + * {
    margin-top: var(--s0);
  }

  ul.open {
    transform: translateX(0);
    visibility: visible;
  }

  li:nth-last-child(2) {
    margin-top: auto;
  }
`;

interface Props {
  openButtonInnerHtml: string;
  children: React.ReactNode;

  openButtonClassName?: string;
  openButtonAriaLabel?: string;
  closeButtonInnerHtml?: string;
  closeButtonClassName?: string;
  closeButtonAriaLabel?: string;
}

export default function NavMenu({
  openButtonInnerHtml,
  closeButtonInnerHtml = 'Close',
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      rootRef.current?.contains(document.activeElement) || setIsOpen(false);
    };
    document.addEventListener('focusin', () => handler());
    return function cleanup() {
      document.removeEventListener('focusin', handler);
    };
  }, [isOpen]);

  return (
    <Wrapper ref={rootRef}>
      <nav>
        <button
          className={`uppercased open-button ${isOpen ? 'open' : ''}`}
          type="button"
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isOpen}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          dangerouslySetInnerHTML={{
            __html: isOpen ? closeButtonInnerHtml : openButtonInnerHtml,
          }}
        />
        <ul role="list" className={`panel ${isOpen ? 'open' : ''}`}>
          {React.Children.map(children, (c) =>
            isValidElement(c)
              ? React.cloneElement(c, { onClick: () => setIsOpen(false) })
              : c
          )}
        </ul>
      </nav>
    </Wrapper>
  );
}
