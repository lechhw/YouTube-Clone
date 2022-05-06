import React, { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

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
    <main className={styles.app}>
      <SearchHeader onSearch={search} onClickLogo={onClickLogo} />
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
    </main>
  );
}

export default App;
