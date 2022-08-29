import Head from "next/head";
import styles from "../styles/AdminDashboard.module.css";

function AdminDashboard() {
  return (
    <div>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      <div className={styles.subHeading}>My Classes {`:)`}</div>
    </div>
  );
}

export default AdminDashboard;
