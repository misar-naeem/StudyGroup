import Head from "next/head";
import AdminOverview from "/components/AdminOverview";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import useSWR from "swr";
import { signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Loading } from "../components/Loading";

function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/staff-login");
    }
  }, []);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  // Get staff info from database
  var email = "";
  if (session) {
    email = session.user.email;
  }
  const { data, error } = useSWR(`/api/get-staff/${email}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );

  if (data["result"].length == 0) return <div>Not found</div>;
  console.log("data");
  console.log(data);
  const tutorialId = data["result"][0]["tutorial"];

  return (
    <div>
      <Head>
        <title>Staff Dashboard</title>
      </Head>
      <h1 className={styles.heading}>Staff Dashboard</h1>

      <div
        style={{
          float: "right",
          marginRight: "20px",
          marginBottom: "40px",
          marginTop: "-50px",
        }}
      >
        {session ? session.user.name : ""} {tutorialId}{" "}
        <Button onClick={() => signOut()}>
          <>Sign out</>
        </Button>{" "}
        <Link href={`/create-topic-preferences?tutorialId=${tutorialId}`}>
          <Button>
            <>Create Topics</>
          </Button>
        </Link>
      </div>

      <AdminOverview tutorialId={tutorialId} />
    </div>
  );
}

export default AdminDashboard;
