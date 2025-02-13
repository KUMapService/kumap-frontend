import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@store/store';
import './index.css';
import App from './App';
import GlobalStyle from './GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <GlobalStyle />
//     <App />
//   </React.StrictMode>,
// );

root.render(
  <Provider store={store}>
    <div>
      <GlobalStyle />
      <App />
    </div>
  </Provider>,
);
