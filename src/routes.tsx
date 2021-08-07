import data from '_data';
import Home from 'screens/Home';
import Introduction from 'screens/Introduction';
import Archive from 'screens/Archive';
import Craft from 'screens/Craft';
import Gallery from 'screens/Gallery';
import Timeline from 'screens/Timeline';
import Search from 'screens/Search';
import DesignerStory from 'screens/DesignerStory';
import ProductStory from 'screens/ProductStory';
import CraftTopic from 'screens/CraftTopic';
import Credits from 'components/Credits';

interface RouteDescriptor {
  title: string;
  path: PathName;
  isNavItem: boolean;
  component: JSX.Element;
}

const allRoutes: RouteDescriptor[] = [
  { title: 'Great Danes', path: '/', isNavItem: false, component: <Home /> },
  {
    title: 'Introduction',
    path: '/introduction',
    isNavItem: true,
    component: <Introduction data={data.introduction} />,
  },
  {
    title: 'History',
    path: '/timeline',
    isNavItem: true,
    component: <Timeline data={data.timeline} />,
  },
  {
    title: 'Archive',
    path: '/archive',
    isNavItem: true,
    component: <Archive data={data.catalog} />,
  },
  {
    title: 'Designer',
    path: '/archive/:designer',
    isNavItem: false,
    component: <DesignerStory data={data.catalog} />,
  },
  {
    title: 'Product',
    path: '/archive/:designer/:product',
    isNavItem: false,
    component: <ProductStory data={data.catalog} />,
  },
  {
    title: 'Gallery',
    path: '/gallery',
    isNavItem: true,
    component: <Gallery data={data.catalog} />,
  },
  {
    title: 'Craft',
    path: '/craft',
    isNavItem: true,
    component: <Craft data={data.craft} />,
  },
  {
    title: 'Craft',
    path: '/craft/wood',
    isNavItem: false,
    component: <CraftTopic />,
  },
  {
    title: 'Search',
    path: '/search',
    isNavItem: false,
    component: <Search data={{ catalog: data.catalog, craft: data.craft }} />,
  },
  {
    title: 'Credits',
    path: '/credits',
    isNavItem: false,
    component: <Credits />,
  },
];

export default allRoutes;
