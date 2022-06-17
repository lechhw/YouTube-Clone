import React, { memo } from 'react';
import styles from './video_item.module.css';
import moment from 'moment';

const CHANNEL_DEFAULT_IMAGE = './images/channel.png';
const VideoItem = memo(
  ({ video, video: { snippet }, onClickVideo, display }) => {
    const displayType = display === 'list' ? styles.list : styles.grid;
    const url = snippet.channels || CHANNEL_DEFAULT_IMAGE;

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

          <div className={styles.data}>
            <div className={styles.logo}>
              <img src={url} alt="channel logo" />
            </div>

            <div className={styles.info}>
              <h1 className={styles.title}>{snippet.title}</h1>

              <span className={styles.misc}>{`${snippet.channelTitle}﹒${moment(
                snippet.publishedAt.substr(0, 10)
              ).fromNow()}`}</span>
            </div>
          </div>
        </div>
      </li>
    );
  }
);

export default VideoItem;
