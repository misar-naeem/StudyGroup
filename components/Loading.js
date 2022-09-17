import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Loading.module.css";
export const Loading = () => {
  return (
    <div className={styles.body}>
      <div class={styles.wrapper}>
        <div class={styles.circle}></div>
        <div class={styles.circle}></div>
        <div class={styles.circle}></div>
        <div class={styles.shadow}></div>
        <div class={styles.shadow}></div>
        <div class={styles.shadow}></div>
        <span>Loading</span>
    </div>
    </div>
  );
};
