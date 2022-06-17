import React from 'react';
import styles from './video_detail.module.css';
import DescriptionBox from './description_box/description_box';

const CHANNEL_DEFAULT_IMAGE = './images/channel.png';

const VideoDetail = ({ video, video: { snippet } }) => {
  const url = snippet.channels || CHANNEL_DEFAULT_IMAGE;

  return (
    <section className={styles.videoDetail}>
      <iframe
        className={styles.videoPlayer}
        type="text/html"
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div className={styles.info}>
        <div className={styles.mainInfo}>
          <h1 className={styles.title}>{snippet.title}</h1>
          <span className={styles.upload}>
            {snippet.publishedAt.substr(0, 10)}
          </span>
        </div>

        <div className={styles.subInfo}>
          <div className={styles.logo}>
            <img src={url} alt="channel" />
          </div>

          <div className={styles.subWrapper}>
            <strong className={styles.channel}>{snippet.channelTitle}</strong>
            <DescriptionBox video={video} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDetail;
