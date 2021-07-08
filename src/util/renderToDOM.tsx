import React from 'react';
import ReactDOM from 'react-dom';

const renderToDOM = (content: JSX.Element) => {
  const node = document.getElementById('2d');
  ReactDOM.unmountComponentAtNode(node!);
  ReactDOM.render(<React.StrictMode>{content}</React.StrictMode>, node);
};

export default renderToDOM;
