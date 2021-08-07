import { Route, Switch } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leva } from 'leva';
// import { Stats } from '@react-three/drei';

import 'styles';
import mainRoutes from './routes';

import NavBar from 'components/NavBar';
import Cursor from 'components/Cursor';

const App = () => {
  return (
    <>
      <Cursor />
      <NavBar
        homeItem={mainRoutes[0]}
        navItems={mainRoutes.filter((m) => m.isNavItem)}
        searchItem={mainRoutes.find((m) => m.path === '/search')!}
      />
      <Leva collapsed hidden />
      {/* <Stats /> */}
      <Route
        render={({ location }) => (
          <AnimatePresence exitBeforeEnter initial={false}>
            <Switch location={location} key={location.pathname}>
              {mainRoutes.map((route) => (
                <Route exact path={route.path} key={route.path}>
                  <motion.div
                    key={route.path}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {route.component}
                  </motion.div>
                </Route>
              ))}
            </Switch>
          </AnimatePresence>
        )}
      />
    </>
  );
};

export default App;
