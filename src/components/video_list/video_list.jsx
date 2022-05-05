import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({ videos }) => (
  <ul className={styles.list}>
    {videos.map((video) => (
      <VideoItem video={video} key={video.id} />
    ))}
  </ul>
);

export default VideoList;
