import React, { useRef, useEffect } from 'react';
import styles from './mini_search_form.module.css';

const MiniSearchForm = ({ onSearch, setMini, darkMode }) => {
  const onDarkMode = darkMode && styles.dark;
  const formRef = useRef();
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    onSearch(value);
    formRef.current.reset();
  };

  const changeDisplay = (e) => {
    !e.matches && setMini(false);
  };

  useEffect(() => {
    const media = window.matchMedia('screen and (max-width: 768px)');
    media.addEventListener('change', changeDisplay);

    // unmount 시 change 이벤트 제거
    return () => media.removeEventListener('change', changeDisplay);
  }, []);

  return (
    <header className={`${styles.header} ${onDarkMode}`}>
      <button className={styles.backBtn} onClick={() => setMini(false)}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>

      <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="검색"
        />
        <button className={styles.searchBtn} type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </header>
  );
};

export default MiniSearchForm;
