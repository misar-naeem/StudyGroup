import styles from "../styles/PageNotFound.module.css";

 const PageNotFound = () => {
  return (
    <div className={styles.container}>
        <h2>0ops! Page not found. </h2>
        <h1>404</h1>
        <p>We can't find the page you're looking for.</p>
        <a href="/" className={styles.link}>Go back home </a>
    </div>
  )
}

export default PageNotFound;
