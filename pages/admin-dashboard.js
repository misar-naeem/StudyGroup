import Head from "next/head";
import StudentOverview from "/components/StudentOverview";
import styles from "../styles/Home.module.css";

function AdminDashboard() {
  return (
    <div>
      <Head>
        <title>Staff Dashboard</title>
      </Head>
      <h1 className={styles.heading}>Staff Dashboard</h1>
      <StudentOverview />
    </div>
  );
}

export default AdminDashboard;
