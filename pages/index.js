import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {

  const { data: session } = useSession()
  if (session) {
    console.log(session)
    return (
      <>
        Signed in as {session.user.email}<br />
        <button onClick={() => signOut()}>Sign out.</button>
      </>
    )
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
          <a href="#" onClick={() => { signIn('azure-ad') }} className={styles.card}>
            <h2>Microsoft Login &rarr;</h2>
            <p>Sign in with Azure Active Directory to continue to SDS application</p>
          </a>

          <a href="#" onClick={() => { signIn('okta') }} className={styles.card}>
            <h2>Okta Login &rarr;</h2>
            <p>Sign in with Okta Identity Platform to continue to SDS application</p>
          </a>
        </div>
      </main>
    </div>
  )
}
