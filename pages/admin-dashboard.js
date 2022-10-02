import Head from "next/head";
import StudentOverview from "../components/StudentOverview";
import styles from "../styles/AdminDashboard.module.css";
import connectMongo from "../util/mongodb";
import Tutorial from "../models/Tutorial";
import Group from "../models/Group";

export async function getStaticProps() {
  console.log("CONNECTING TO MONGO");
  await connectMongo();
  console.log("CONNECTED TO MONGO");

  // For now we will test by using Groups from Tutorial 1

  const tutorialData = await Tutorial.find({ _id: "6309ff67206f5d4fa8e8bdd1" });
  const tutorial = JSON.parse(JSON.stringify(tutorialData));

  const groupData = await Group.find({
    tutorialId: "6309ff67206f5d4fa8e8bdd1",
  });
  const groups = JSON.parse(JSON.stringify(groupData));

  return {
    props: { groups: groups, tutorial: tutorial },
  };
}

function AdminDashboard({ groups, tutorial }) {
  return (
    <div>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <h1 className={styles.heading}>Admin Dashboard</h1>

      <StudentOverview groups={groups} tutorial={tutorial} />
    </div>
  );
}

export default AdminDashboard;
