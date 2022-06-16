import React, { useRef } from 'react';
import styles from './search_form.module.css';

const SearchForm = ({ onSearch, darkMode }) => {
  const onDarkMode = darkMode && styles.dark;
  const formRef = useRef();
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    onSearch(value);
    formRef.current.reset();
  };

  return (
    <form
      ref={formRef}
      className={`${styles.form} ${onDarkMode}`}
      onSubmit={onSubmit}
    >
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="검색"
      />
      <button className={styles.button} type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default SearchForm;
