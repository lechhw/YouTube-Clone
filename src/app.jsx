import React, { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(darkMode ? false : true);
  };

  const onClickLogo = () => {
    setSelectedVideo(null);
    youtube.popularList().then((videos) => setVideos(videos));
  };

  // click된 비디오 setSelectedVideo 에 담기
  const onClickVideo = useCallback((video) => {
    setSelectedVideo(video);
  }, []);

  // 키워드 검색
  const search = useCallback((keyword) => {
    if (keyword) {
      youtube.search(keyword).then((videos) => {
        setVideos(videos);
        setSelectedVideo(null);
      });
    }
  }, []);

  // 인기동영상
  useEffect(() => {
    youtube.popularList().then((videos) => setVideos(videos));
  }, [youtube]);

  return (
    <main
      className={`${styles.app} ${
        darkMode ? styles.app_dark : styles.app_white
      } `}
    >
      <button className={styles.mode_button} onClick={toggleDarkMode}>
        <i className="fa-solid fa-moon"></i>
      </button>

      <SearchHeader
        onSearch={search}
        onClickLogo={onClickLogo}
        display={darkMode ? 'dark' : 'white'}
      />

      <div className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onClickVideo={onClickVideo}
            display={selectedVideo ? 'list' : 'grid'}
          />
        </div>
      </div>

      <p className={styles.writer}>2022/05 * LeeChangHwan</p>
    </main>
  );
}

export default App;
