import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//this import needs to be added when using react bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from './context/Context';
ReactDOM.render(
  <React.StrictMode>
    <Context>
    <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
