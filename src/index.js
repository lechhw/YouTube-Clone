import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import '@fortawesome/fontawesome-free/js/all.js';
import YouTube from './service/youtube';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

const httpURL = axios.create({
  baseURL: 'https://content-youtube.googleapis.com/youtube/v3',
  params: {
    key: process.env.REACT_APP_YOUTUBE_API_KEY,
  },
});
const youtube = new YouTube(httpURL);
root.render(
  <React.StrictMode>
    <App youtube={youtube} />
  </React.StrictMode>
);
