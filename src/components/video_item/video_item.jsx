import React, { memo } from 'react';
import styles from './video_item.module.css';

const VideoItem = memo(
  ({ video, video: { snippet }, onClickVideo, display }) => {
    const displayType = display === 'list' ? styles.list : styles.grid;
    return (
      <li
        className={`${styles.video} ${displayType}`}
        onClick={() => onClickVideo(video)}
      >
        <div className={styles.card}>
          <img
            className={styles.thumbnail}
            src={snippet.thumbnails.medium.url}
            alt="thumbnail"
          />
          <h1 className={styles.title}>{snippet.title}</h1>
          <span className={styles.channel}>{snippet.channelTitle}</span>
        </div>
      </li>
    );
  }
);

export default VideoItem;
