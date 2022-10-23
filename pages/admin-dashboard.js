import Head from "next/head";
import AdminOverview from "/components/AdminOverview";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Loading } from "../components/Loading";

function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  // Get staff info from database
  var email = "";
  if (session) {
    email = session.user.email;
  }
  const { data, error } = useSWR(`/api/get-staff?staff=${email}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );
  if (data["result"].length == 0) return <div>Not found</div>;
  const tutorialId = data["result"][0]["tutorial"];

  return (
    <div>
      <Head>
        <title>Staff Dashboard</title>
      </Head>
      <h1 className={styles.heading}>
        Tutorial {tutorialId ? tutorialId[tutorialId?.length - 1] : null}
      </h1>

      <div
        style={{
          float: "right",
          marginRight: "20px",
          marginBottom: "40px",
          marginTop: "-50px",
        }}
      >
        <Button onClick={() => router.push("/student-dashboard")}>
          Switch to Student Dashboard
        </Button>
        <Button
          onClick={() => signOut()}
          variant="danger"
          style={{
            backgroundColor: "#FF595E",
            width: "100px",
            marginLeft: "10px",
          }}
        >
          Log out
        </Button>{" "}
      </div>
      <h2 className="mt-3" style={{ marginLeft: "35px" }}>
        Welcome {session ? session.user.name : ""}
      </h2>
      <AdminOverview tutorialId={tutorialId} />
    </div>
  );
}

export default AdminDashboard;
