import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({ videos, onClickVideo, display }) => {
  const displayType = display === 'grid' && styles.grid;

  return (
    <ul className={`${styles.list} ${displayType}`}>
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
};

export default VideoList;
