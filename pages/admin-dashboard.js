import Head from "next/head";
import AdminOverview from "/components/AdminOverview";
import styles from "../styles/Home.module.css";

function AdminDashboard() {
    
  return (
    <div>
      <Head>
        <title>Staff Dashboard</title>
      </Head>
      <h1 className={`${styles.heading} ps-5 p-3`}>Tutorial Name</h1>
      <AdminOverview />
    </div>
  );
}

export default AdminDashboard;
