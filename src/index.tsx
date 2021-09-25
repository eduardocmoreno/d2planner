import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheetManager } from 'styled-components';
import App from 'App';
import 'assets/scss/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <StyleSheetManager disableVendorPrefixes={process.env.NODE_ENV === 'development'}>
      <App />
    </StyleSheetManager>
  </React.StrictMode>,
  document.getElementById('root')
);
