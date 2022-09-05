import Head from "next/head";
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
          <a
            href="#"
            onClick={() => {
              signIn("azure-ad");
            }}
            className={styles.card}
          >
            <h2>Microsoft Login &rarr;</h2>
            <p>
              Sign in with Azure Active Directory to continue to SDS application
            </p>
          </a>
        </div>
        <div className={styles.card}>
          <Link href="/admin-dashboard" className={styles.card}>
            <p>Admin Dashboard</p>
          </Link>
        </div>
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
      </main>
    </div>
  );
}
