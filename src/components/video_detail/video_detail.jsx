import React from 'react';
import styles from './video_detail.module.css';
import DescriptionBox from './description_box/description_box';

const CHANNEL_DEFAULT_IMAGE = './images/channel.png';

const VideoDetail = ({ video, video: { snippet } }) => {
  const url = snippet.channels || CHANNEL_DEFAULT_IMAGE;

  return (
    <section className={styles.video_detail}>
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
        <div className={styles.main_info}>
          <h1 className={styles.title}>{snippet.title}</h1>
          <span className={styles.upload}>
            {snippet.publishedAt.substr(0, 10)}
          </span>
        </div>

        <div className={styles.sub_info}>
          <div className={styles.logo}>
            <img src={url} alt="channel" />
          </div>
          <div className={styles.sub_right}>
            <strong className={styles.channel}>{snippet.channelTitle}</strong>
            <DescriptionBox video={video} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoDetail;
