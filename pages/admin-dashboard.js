import Head from "next/head";
import StudentOverview from "../components/StudentOverview";
import styles from "../styles/AdminDashboard.module.css";
import connectMongo from "../util/mongodb";
// import Tutorial from "../models/Tutorial";
import Group from "../models/Group";

export async function getStaticProps() {
  // const tutorialId = "tut1";

  console.log("CONNECTING TO MONGO");
  await connectMongo();
  console.log("CONNECTED TO MONGO");

  // const result = await Tutorial.find({ tutorialId: "tut1" });
  const result = await Group.find();

  console.log(result)

  const groups = JSON.parse(JSON.stringify(result));

  console.log(groups)

  return {
    props: { groups: groups },
  };
}

function AdminDashboard({ groups }) {
  return (
    <div>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      <div className={styles.subHeading}>My Classes {`:)`}</div>
      <StudentOverview groups={groups} />
    </div>
  );
}

export default AdminDashboard;
