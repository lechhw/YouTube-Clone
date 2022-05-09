import React, { useState } from 'react';
import styles from './search_header.module.css';

const SearchHeader = ({ onSearch, onClickLogo, display }) => {
  const inputRef = React.createRef();
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const displayType = display === 'dark' ? styles.dark : styles.white;

  const returnToHome = () => {
    setOpenSideMenu(false);
    onClickLogo();
  };

  const toggleSideMenu = () => {
    setOpenSideMenu(openSideMenu ? false : true);
  };

  const handleSearch = () => {
    const keyword = inputRef.current.value;
    onSearch(keyword);
    inputRef.current.value = '';

    if (openSideMenu) {
      setOpenSideMenu(false);
    }
  };

  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <header className={`${styles.header} ${displayType}`}>
        <div className={styles.logo}>
          <button
            onClick={toggleSideMenu}
            className={styles.menu_button}
            type="button"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <img
            onClick={onClickLogo}
            className={styles.logo_img}
            src="./images/logo.png"
            alt="logo"
          />
          <h1 className={styles.title}>YouTube</h1>
        </div>

        <div className={styles.input_group}>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="검색"
            onKeyPress={onKeyPress}
          />
          <button
            onClick={onClick}
            className={styles.search_button}
            type="submit"
          >
            <img src="./images/search.svg" alt="search" />
          </button>
        </div>
      </header>

      {/* sidebar */}
      <aside
        className={`${
          openSideMenu ? styles.sidebar_show : styles.sidebar_hide
        } ${displayType}`}
      >
        <ul className={styles.list}>
          <li className={styles.menu} onClick={returnToHome}>
            <i className="fa-solid fa-house"></i>
            <span>홈</span>
          </li>
          <li className={styles.menu}>
            <i className="fa-solid fa-compass"></i>
            <span>탐색</span>
          </li>
          <li className={styles.menu}>
            <i className="fa-solid fa-bookmark"></i>
            <span>구독</span>
          </li>
        </ul>

        <div className={styles.overlay} onClick={toggleSideMenu}></div>
      </aside>
    </>
  );
};

export default SearchHeader;
