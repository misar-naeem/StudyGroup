import Head from "next/head";
import styles from "../styles/Home.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from "next/link";

export default function StudentLogin() {
  const { data: session } = useSession();
  const router = useRouter()

  if (session) {
    console.log(session);
    router.push('/student-dashboard')

    return (
      <>
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
          Student Login
        </h1>

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
            <Link href="/" className={styles.card}>
              <p>Home</p>
            </Link>
        </div>
      </main>
    </div>
  );
}
