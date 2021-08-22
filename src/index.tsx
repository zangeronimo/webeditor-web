import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Hooks from './hooks';
import GlobalStyles from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <Hooks>
      <App />
      <GlobalStyles />
    </Hooks>
  </React.StrictMode>,
  document.getElementById('root'),
);
