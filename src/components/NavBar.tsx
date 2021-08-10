import styled from 'styled-components/macro';
import { useEffect, useState } from 'react';
import { Pivot as Hamburger } from 'hamburger-react';
import { Link, useLocation } from 'react-router-dom';
import NavItem from 'components/NavItem';
import SearchIcon from 'components/SearchButton';
import SoundButton from 'components/SoundButton';
import FullscreenIcon from './FullscreenIcon';

const StyledNav = styled.nav`
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: var(--navbar-height);
  color: var(--danish-red);
  padding-left: var(--bleed);
  padding-right: var(--bleed);
  top: 0;

  li:active,
  li:focus {
    outline: none;
  }
`;

const PopUp = styled.div`
  position: relative;

  ul {
    /* TODO */
    display: flex;
    position: absolute;
    transform: translate(-100%, -150%);
  }
`;

const StdLi = styled.li`
  margin-right: var(--flow-gap);
  opacity: 0;
  transition: opacity 0.3s ease-out 0s;
  pointer-events: none;

  &.open {
    opacity: 1;
    transition-timing-function: ease-in;
    pointer-events: unset;
  }
`;

const HomeItem = styled.div`
  flex-grow: 1;
  opacity: 1;
  > * {
    font-weight: var(--font-weight-md);
  }
`;

const SVGItem = styled.div`
  button {
    height: 48px;
    width: 48px;
    outline: none;
  }

  svg {
    margin-left: auto;
    margin-right: auto;
    stroke: var(--danish-red);
  }
`;

type MenuItem = { title: string; path: string };

interface Props {
  homeItem: MenuItem;
  navItems: MenuItem[];
  searchItem: MenuItem;
}

const NavBar = ({ homeItem, navItems, searchItem }: Props) => {
  const location = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    setIsBurgerOpen(false);
    const burgerBars: NodeListOf<HTMLDivElement> = document.querySelectorAll(
      '.hamburger-react > div > div'
    );
    burgerBars.forEach((node) => (node.style.height = '2px'));
  }, [location]);

  return (
    <StyledNav style={{ opacity: location.pathname === '/search' ? 0.2 : 1 }}>
      <HomeItem>
        <NavItem title={homeItem.title} path={homeItem.path}>
          <span
            style={{
              color: 'white',
              backgroundColor: 'var(--danish-red)',
              borderRadius: '4px',
              marginInlineStart: '0.5rem',
              paddingInlineStart: '8px',
              paddingInlineEnd: '8px',
            }}
          >
            BETA
          </span>
        </NavItem>
      </HomeItem>
      <PopUp>
        <Hamburger
          label="Menu"
          toggled={isBurgerOpen}
          toggle={setIsBurgerOpen}
        />
        <ul>
          {navItems.map((item) => (
            <StdLi key={item.path} className={isBurgerOpen ? 'open' : ''}>
              <NavItem title={item.title} path={item.path} />
            </StdLi>
          ))}
        </ul>
      </PopUp>
      <SVGItem>
        <Link to={searchItem.path}>
          <SearchIcon />
        </Link>
      </SVGItem>
      <SVGItem>
        <SoundButton />
      </SVGItem>
      <SVGItem>
        <button
          aria-label="Toggle Full Screen"
          title="Toggle Full Screen"
          onClick={() => {
            document.fullscreenElement
              ? document.exitFullscreen()
              : document.documentElement.requestFullscreen();
          }}
        >
          <FullscreenIcon />
        </button>
      </SVGItem>
    </StyledNav>
  );
};

export default NavBar;
