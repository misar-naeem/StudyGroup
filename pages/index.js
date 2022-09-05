import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();


  if (session) {
    console.log(session);
    return (
      <>
        Signed in as {session.user.email}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Study Group</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Study Group</a>
        </h1>

        <p className={styles.description}>
          An SDS Project from University of Technology Sydney
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href="/student-login" className={styles.card}>
              <p>Student Login</p>
            </Link>
          </div>

          <div className={styles.card}>
            <Link href="/staff-login" className={styles.card}>
              <p>Staff Login</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
