import React from 'react';
import styles from './search_error.module.css';

const SearchError = () => {
  return (
    <section className={styles.container}>
      <h1>검색 결과가 없습니다.</h1>
      <p>다른 검색어를 입력해 주세요.</p>
    </section>
  );
};

export default SearchError;
