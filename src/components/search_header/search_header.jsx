import React, { useState } from 'react';
import SideMenu from '../side_menu/side_menu';
import styles from './search_header.module.css';

const SearchHeader = ({ onSearch, onClickLogo }) => {
  const inputRef = React.createRef();
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleSideMenu = () => {
    setOpenSideMenu(openSideMenu ? false : true);
  };

  const handleSearch = () => {
    const keyword = inputRef.current.value;
    onSearch(keyword);
    inputRef.current.value = '';
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
      <header className={styles.header}>
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

        <button className={styles.login_button}>
          <i className="fa-regular fa-circle-user"></i>
          <span className={styles.span}>로그인</span>
        </button>
      </header>

      <aside
        className={`${styles.side_menu} ${
          openSideMenu ? styles.show : styles.hide
        }`}
      >
        <SideMenu />
      </aside>
    </>
  );
};

export default SearchHeader;
