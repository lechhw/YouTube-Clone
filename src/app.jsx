import React, { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);

  // 키워드 검색
  const search = useCallback((keyword) => {
    if (keyword) {
      youtube.search(keyword).then((videos) => setVideos(videos));
    }
  }, []);

  // 인기동영상
  useEffect(() => {
    youtube.popularList().then((videos) => setVideos(videos));
  }, [youtube]);

  return (
    <main className={styles.app}>
      <SearchHeader onSearch={search} />
      <VideoList videos={videos} />
    </main>
  );
}

export default App;
