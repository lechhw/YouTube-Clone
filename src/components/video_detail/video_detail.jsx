import React from 'react';
import styles from './video_detail.module.css';

// 비디오 플레이 화면

const VideoDetail = ({ video, video: { snippet } }) => (
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
    <div className={styles.meta_data}>
      <h1 className={styles.title}>{snippet.title}</h1>
      <span className={styles.channel}>{snippet.channelTitle}</span>
      <pre className={styles.desc}>{snippet.description}</pre>
    </div>
  </section>
);

export default VideoDetail;
