import React from 'react';
import styles from './video_item.module.css';

const VideoItem = ({ video }) => (
  <li className={styles.video}>
    <div className={styles.card}>
      <img
        className={styles.thumbnail}
        src={video.snippet.thumbnails.medium.url}
        alt="thumbnail"
      />
      <h1 className={styles.title}>{video.snippet.title}</h1>
      <span className={styles.channel}>{video.snippet.channelTitle}</span>
    </div>
  </li>
);

export default VideoItem;
