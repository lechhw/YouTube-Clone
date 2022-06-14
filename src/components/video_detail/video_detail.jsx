import React from 'react';
import styles from './video_detail.module.css';

// 비디오 플레이 화면
const CHANNEL_DEFAULT_IMAGE = './images/channel.png';

const VideoDetail = ({ video, video: { snippet } }) => {
  const url = snippet.channels || CHANNEL_DEFAULT_IMAGE;

  return (
    <section>
      <iframe
        className={styles.video_player}
        type="text/html"
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={url} alt="channel" />
        </div>

        <div className={styles.meta_data}>
          <h1 className={styles.title}>{snippet.title}</h1>
          <span className={styles.channel}>{snippet.channelTitle}</span>
          <pre className={styles.desc}>{snippet.description}</pre>
        </div>
      </div>
    </section>
  );
};

export default VideoDetail;
