import styles from "./main.navigation.module.css";

export default function MainNavigation() {
  return (
    <div className={styles["main-navigation"]}>
      <button
        className={styles["menu-btn"]}
        type="button"
        aria-label="Main Navigation"
      >
        <div className={styles["menu-btn__line"]}></div>
        <div className={styles["menu-btn__line"]}></div>
        <div className={styles["menu-btn__line"]}></div>
      </button>

      <ul className={styles["menu"]}>
        <li className={styles["menu-item"]}>Home</li>
        <li className={styles["menu-item"]}>Work</li>
        <li className={styles["menu-item"]}>About</li>
        <li className={styles["menu-item"]}>Contact</li>
      </ul>
    </div>
  );
}
