import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Loading.module.css";
export const Loading = () => {
  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        <span>Loading</span>
    </div>
    </div>
  );
};
