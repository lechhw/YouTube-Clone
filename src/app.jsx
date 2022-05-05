import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);

  // 인기동영상
  useEffect(() => {
    youtube.popularList().then((videos) => setVideos(videos));
  }, [youtube]);

  return (
    <main className={styles.app}>
      <VideoList videos={videos} />
    </main>
  );
}

export default App;
