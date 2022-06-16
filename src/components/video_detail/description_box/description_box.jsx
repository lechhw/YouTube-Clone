import React, { useState } from 'react';
import styles from './description_box.module.css';

const DescriptionBox = ({ video, video: { snippet } }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <pre className={`${styles.desc} ${open ? styles.open : styles.close}`}>
        {snippet.description}
      </pre>
      <button className={styles.button} onClick={() => setOpen(!open)}>
        {open ? '간략히' : '더보기'}
      </button>
    </div>
  );
};

export default DescriptionBox;
