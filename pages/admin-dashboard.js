import Head from "next/head";
import StudentOverview from "/components/StudentOverview";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import useSWR from 'swr';
import { signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from 'next/router'
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { Loading } from "../components/Loading";

function AdminDashboard() {

  const { data: session } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (!session) {
        router.push('/staff-login')
    }
}, [])

  const fetcher = (url) => fetch(url).then((res) => res.json());

  // Get staff info from database
  var email = "";
  if (session) { email = session.user.email }
  const {data, error} = useSWR(`/api/get-staff/${email}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div><Loading /></div>; 

  if (data["result"].length == 0) return <div>Not found</div>
  console.log("data")
  console.log(data)
  const tutorialId = data["result"][0]["tutorial"]
    
  return (
    <div>
      <Head>
        <title>Staff Dashboard</title>
      </Head>
      <h1 className={styles.heading}>Staff Dashboard</h1>

      <div>
        <div>
          <p>{session ? session.user.name : ""} {tutorialId}</p>
        </div>
        <div>
          <Button onClick={() => signOut()}>Sign out.</Button>
        </div>
      </div>
      
      <div>
      <Button>
        <Link href={`/create-topic-preferences?tutorialId=${tutorialId}`}>
          <p>Create Topics</p>
        </Link>
      </Button>
      </div>

      <StudentOverview />
    </div>
  );
}

export default AdminDashboard;
