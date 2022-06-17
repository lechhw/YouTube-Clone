# YouTube Clone

# Intro

Youtube Data API 를 이용한 클론 프로젝트입니다.<br>
Youtube의 기능인 (인기동영상, 검색기능, 영상 재생) 기능을 구현 하였습니다.<br>
또한 다크모드 기능을 추가하여 하단의 모드버튼 클릭으로 사용자가 기호에 맞게 다크모드 or 라이트 모드로 이용할 수있습니다.

<br>

## Live Demo : [YouTube Clone](https://lechhw-youtube-clone.netlify.app)

작업기간

- 2022.05.05 ~ 2022.05.10 1차 배포
- 2022.06.14 ~ 2022.06.17 (채널정보 불러오기, UI 수정, 로딩스피너 추가, 에러핸들링, 코드 리팩토링)

<br>

# Skills

- [x] React
  - React Functional Component
- [x] PostCSS
- [x] Postman
- [x] Deploy: Netlify

<br>

# Preview

## Click Video

<img src="https://user-images.githubusercontent.com/99241230/174271190-938e1ade-af27-46eb-983b-0aa7bd3dfa9d.gif">

<br>

## Search video

<img src="https://user-images.githubusercontent.com/99241230/174272073-694c0790-3c0a-4959-9637-8c6975870bce.gif">

<br>

## Responsive Web

<img src="https://user-images.githubusercontent.com/99241230/174273316-f09971d6-8757-4d41-9b50-8bb988be42eb.gif">

<br>

<img src="https://user-images.githubusercontent.com/99241230/174274175-fae02473-c4e8-4549-be56-cdad55e07d9f.gif">

<br>

## Error Handling

<img src="https://user-images.githubusercontent.com/99241230/174281237-b7be680a-6fb0-42fd-9ce5-fdc8535199ec.gif">

<br>

# Solution

- Postman 에서 api 테스트 후 받아온 fetch 코드를 비동기 통신 라이브러리인 Axios 를 사용하여 좀 더 가독성을 좋게 하였습니다.

```js
class YouTube {
  constructor(httpURL) {
    this.youtube = httpURL;
    this.channels = [];
  }

  // 인기동영상 리스트 불러오기
  async popularList() {
    const response = await this.youtube.get('videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 32,
        regionCode: 'KR',
      },
    });

    // 함수 재실행될때 channels 배열 값 reset
    this.channels.splice(0, this.channels.length);

    response.data.items.map((item) => {
      const result = { ...item };
      return this.channels.push(
        this.getChannels(result.snippet.channelId, result)
      );
    });

    // this.channels 에 값이 다 들어온 후 return
    return Promise.all(this.channels).then((values) => values);
  }

  // ... 생략
}

export default YouTube;
```

<br>

- matchMedia() 메서드를 사용하여 화면 크기에 맞게 검색창을 변경하였습니다.

```js
const SearchHeader = ({ onSearch, onClickLogo, darkMode }) => {
  const onDarkMode = darkMode && styles.dark;
  const [mQuery, setMQuery] = useState(window.innerWidth < 768 ? true : false);
  const [miniSearch, setMiniSearch] = useState(false);

  const changeDisplay = (e) => {
    const matches = e.matches;
    setMQuery(matches);
  };

  const setMini = (state) => {
    setMiniSearch(state);
  };

  useEffect(() => {
    let media = window.matchMedia('screen and (max-width: 768px)');
    media.addEventListener('change', changeDisplay);

    // unmount 시 change 이벤트 제거
    return () => {
      media.removeEventListener('change', changeDisplay);
    };
  }, []);

  return (
    <>
      {miniSearch ? (
        <MiniSearchForm
          onSearch={onSearch}
          setMini={setMini}
          darkMode={darkMode}
        />
      ) : (
        <header className={`${styles.header} ${onDarkMode}`}>
          <div className={styles.logo} onClick={onClickLogo}>
            <img
              className={styles.logoImg}
              src="./images/logo.png"
              alt="logo"
            />
            <h1 className={styles.title}>YouTube</h1>
          </div>

          {mQuery ? (
            <></>
          ) : (
            <SearchForm onSearch={onSearch} darkMode={darkMode} />
          )}

          <div className={styles.iconWrapper}>
            {mQuery && (
              <button
                className={styles.searchBtn}
                onClick={() => setMiniSearch(true)}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            )}
            <button className={styles.iconBtn} title="알림">
              <i className="fa-solid fa-bell"></i>
            </button>
            <button className={styles.iconBtn} title="앱">
              <i className="fa-solid fa-table-cells"></i>
            </button>
            <button className={styles.iconBtn} title="사용자">
              <i className="fa-solid fa-circle-user"></i>
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default SearchHeader;
```

<br>

- 사용자가 데이터를 받아오는 동안 로딩 중임을 알 수 있게끔 로딩 스피너를 구현하였습니다.

```js
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

  return(
    // ...생략
  )
}

export default App;

```

<br>

- 해당 검색 결과가 없을 때 검색 결과가 없다는 내용을 보여주어 에러 핸들링을 해주었습니다.

```js
function App({ youtube }) {
  // ...생략

  return (
    <div className={`${styles.app} ${darkMode && styles.dark} `}>
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


  );
}
export default App;

// --------------------------------

// search_error.jsx
const SearchError = () => {
  return (
    <section className={styles.container}>
      <h1>검색 결과가 없습니다.</h1>
      <p>다른 검색어를 입력해 주세요.</p>
    </section>
  );
};

export default SearchError;

```

<br>

- 사용자가 디스플레이 모드를 기호에 따라 사용할 수 있게 하기 위해 다크모드 기능을 추가하였습니다.

```js
function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // ...생략
  return (
    <div className={`${styles.app} ${darkMode && styles.dark} `}>
      <SearchHeader
        onSearch={search}
        onClickLogo={onClickLogo}
        darkMode={darkMode}
      />
      // ...생략
      <button className={styles.modeBtn} onClick={() => setDarkMode(!darkMode)}>
        <i className="fa-solid fa-moon"></i>
      </button>
    </div>
  );
}

export default App;
```
