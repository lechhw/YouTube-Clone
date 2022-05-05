import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import YouTube from './service/youtube';

const root = ReactDOM.createRoot(document.getElementById('root'));
const youtube = new YouTube(process.env.REACT_APP_YOUTUBE_API_KEY);
root.render(
  <React.StrictMode>
    <App youtube={youtube} />
  </React.StrictMode>
);
