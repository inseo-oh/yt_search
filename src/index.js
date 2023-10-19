import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './reset.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function initReact() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();

}

gapi.load('client', function () {
  gapi.client.setApiKey(API_KEY);
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function () {
      console.log("GAPI client loaded for API");
      initReact();
    },
      function (err) { console.error("Error loading GAPI client for API", err); });
});

