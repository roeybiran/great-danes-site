import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import SL from 'styled/SlidingUnderline';

const SlidingUnderline = styled(SL)`
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  > span {
    letter-spacing: 0;
  }

  &.active {
    font-weight: var(--font-weight-md);
  }
`;

interface Props {
  title: string;
  path: string;
  children?: React.ReactNode;
}

const NavItem = ({ title, path, children }: Props) => (
  <SlidingUnderline to={path} as={NavLink}>
    {title.slice(0, -1)}
    <span>{title.slice(-1)}</span>
    {children}
  </SlidingUnderline>
);

export default NavItem;
