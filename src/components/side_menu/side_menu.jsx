import React from 'react';
import styles from './side_menu.module.css';

const SideMenu = (props) => (
  <>
    <ul>
      <ul className={styles.list}>
        <li className={styles.menu}>
          <i className="fa-solid fa-house"></i>
          <span>홈</span>
        </li>
        <li className={styles.menu}>
          <i className="fa-solid fa-compass"></i>
          <span>탐색</span>
        </li>
        <li className={styles.menu}>
          <img src="./images/subscription.svg" alt="" />
          <span>구독</span>
        </li>
      </ul>
    </ul>

    <div className={styles.overlay}></div>
  </>
);

export default SideMenu;
