import React from 'react';
import styles from './search_header.module.css';

const SearchHeader = ({ onSearch }) => {
  const inputRef = React.createRef();

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
    <header className={styles.header}>
      <div className={styles.logo}>
        <button className={styles.menu_button} type="button">
          <i className="fa-solid fa-bars"></i>
        </button>
        <div>
          <img className={styles.logo_img} src="./images/logo.png" alt="logo" />
        </div>
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
  );
};

export default SearchHeader;
