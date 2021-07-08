import SearchButton from './SearchButton';
import SoundButton from './SoundButton';
import styled from 'styled-components';
import { MouseEventHandler } from 'react';

const StyledNav = styled.nav`
  z-index: 1;
  position: fixed;
  width: 100%;
  height: var(--navbar-height);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  color: var(--danish-red);
  padding-left: var(--bleed);
  padding-right: var(--bleed);
  display: flex;
  flex-wrap: nowrap;
  bottom: 0;
  column-gap: var(--flow-gap);

  .icons-wrapper {
    display: flex;
    gap: var(--flow-gap);
  }

  ul {
    width: 100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
    column-gap: calc(1.5 * var(--flow-gap));
  }

  li:first-child {
    flex-grow: 1;
    font-weight: 700;
  }

  span {
    letter-spacing: 0;
  }
`;

interface Props {
  menuItems: { title: string; id: string }[];
  onClick: MouseEventHandler;
}

const NavBar = ({ menuItems, onClick }: Props) => (
  <StyledNav>
    <ul>
      {menuItems.map(({ title, id }) => {
        return (
          <li key={id}>
            <a
              href="/"
              data-scene={id}
              className="sliding-underline"
              onClick={onClick}
            >
              {title.slice(0, -1)}
              <span style={{ letterSpacing: 0 }}>{title.slice(-1)}</span>
            </a>
          </li>
        );
      })}
    </ul>
    <div className="icons-wrapper">
      <SearchButton />
      <SoundButton />
    </div>
  </StyledNav>
);

export default NavBar;
