import Head from "next/head";
import StudentOverview from '../components/StudentOverview';
import styles from "../styles/AdminDashboard.module.css";

function AdminDashboard() {
  return (
    <div>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      <div className={styles.subHeading}>My Classes {`:)`}</div>
      <StudentOverview />
    </div>
  );
}

export default AdminDashboard;
