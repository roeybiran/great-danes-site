import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { Stats } from '@react-three/drei';

import 'styles';
import ScrollToTop from 'components/ScrollToTop';
import App from './App';

// import Cursor from 'components/Cursor';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
