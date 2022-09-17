import Head from "next/head";
import styles from "../styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import LoginRedirect from "./login-redirect";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    console.log(session);
    return (
      <LoginRedirect/>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>StudyGroup Landing Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.body}>
        <main className={`${styles.main} "d-flex flex-column"`}>
          <img
            src="../icons/darkStudyIcon.png"
            alt="logo icon"
            height="200"
            width="200"
            className={styles.logo}
          />
          <h1 className={`${styles.title} `}>StudyGroup.</h1>
          <div className={styles.grid}>
            <a
              href="#"
              onClick={() => {
                signIn("azure-ad");
              }}
              className={styles.card}
            >
              <h2>Continue with Microsoft Login &rarr;</h2>
              <p>Sign in with Azure Active Directory to continue.</p>
            </a>
          <div className={styles.card}>
            <Link href="/staff-dashboard" className={styles.card}>
              <p>Staff Dashboard</p>
            </Link>
          </div>
          <div className={styles.card}>
            <Link href="/student-dashboard" className={styles.card}>
              <p>Student Dashboard</p>
            </Link>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}
