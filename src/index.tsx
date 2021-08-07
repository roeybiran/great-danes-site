import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
// import { Stats } from '@react-three/drei';

import 'styles';
import ScrollToTop from 'components/ScrollToTop';
import ParallaxCache from 'components/ParallaxCache';
import App from './App';

// import Cursor from 'components/Cursor';

ReactDOM.render(
  <React.StrictMode>
    <ParallaxProvider>
      <ParallaxCache />
      <Router>
        <ScrollToTop />
        <App />
      </Router>
    </ParallaxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
