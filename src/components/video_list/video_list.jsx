import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({ videos, onClickVideo, display }) => (
  <ul className={styles.list}>
    {videos.map((video) => (
      <VideoItem
        video={video}
        key={video.id}
        onClickVideo={onClickVideo}
        display={display}
      />
    ))}
  </ul>
);

export default VideoList;
