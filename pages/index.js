import Head from "next/head";
import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/login-redirect");
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
                signIn("azure-ad", {
                  callbackUrl: "/login-redirect",
                });
              }}
              className={styles.card}
            >
              <h2>Continue with Microsoft Login &rarr;</h2>
              <p>Sign in with Azure Active Directory to continue.</p>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
