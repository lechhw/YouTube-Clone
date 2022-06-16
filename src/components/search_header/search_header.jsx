import React, { useState, useEffect } from 'react';
import MiniSearchForm from './mini_search_form/mini_search_form';
import SearchForm from './search_form/search_form';
import styles from './search_header.module.css';

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
