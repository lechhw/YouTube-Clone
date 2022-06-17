import React, { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchError from './components/search_error/search_error';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClickLogo = () => {
    setLoading(true);
    setSelectedVideo(null);
    youtube.popularList().then((videos) => {
      setVideos(videos);
      setLoading(false);
    });
  };

  // click된 비디오 setSelectedVideo 에 담기
  const onClickVideo = useCallback((video) => {
    window.scrollTo(0, 0);
    setSelectedVideo(video);
  }, []);

  // 키워드 검색
  const search = useCallback(
    (keyword) => {
      setLoading(true);
      if (keyword) {
        youtube.search(keyword).then((videos) => {
          setVideos(videos);
          setSelectedVideo(null);
          setLoading(false);
        });
      }
    },
    [youtube]
  );

  // 인기동영상
  useEffect(() => {
    youtube.popularList().then((videos) => setVideos(videos));
  }, [youtube]);

  return (
    <div className={`${styles.app} ${darkMode && styles.dark} `}>
      <SearchHeader
        onSearch={search}
        onClickLogo={onClickLogo}
        darkMode={darkMode}
      />

      {!loading && (
        <main className={styles.contents}>
          {selectedVideo && (
            <div className={styles.detail}>
              <VideoDetail video={selectedVideo} />
            </div>
          )}
          <div className={styles.list}>
            {videos === undefined ? (
              <SearchError />
            ) : (
              <VideoList
                videos={videos}
                onClickVideo={onClickVideo}
                display={selectedVideo ? 'list' : 'grid'}
              />
            )}
          </div>
        </main>
      )}

      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
        </div>
      )}

      <button className={styles.modeBtn} onClick={() => setDarkMode(!darkMode)}>
        <i className="fa-solid fa-moon"></i>
      </button>

      <footer className={styles.footer}>
        <p>2022.05 by LeeChangHwan</p>
      </footer>
    </div>
  );
}

export default App;
