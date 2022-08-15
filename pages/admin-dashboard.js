import styles from "./admin-dashboard.module.css";

function AdminDashboard() {
  return (
    <div>
      <h1 className={styles["heading"]}>Admin Dashboard</h1>

      <div className={styles["sub-heading"]}>My Classes {`:)`}</div>

    </div>
  );
}

export default AdminDashboard;
