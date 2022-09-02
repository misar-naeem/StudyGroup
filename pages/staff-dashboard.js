import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import useSWR from 'swr';
import { signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from 'next/router'
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';

export default function StaffDashboard() {
    const { data: session } = useSession();
    const router = useRouter()

    // Literal jank if someone knows auth and routing feel free to fix
    useEffect(() => {
        if (!session) {
            router.push('/staff-login')
        }
    })

    const fetcher = (url) => fetch(url).then((res) => res.json());

    // Get student info from database
    var email = "";
    if (session) { email = session.user.email }
    const {data, error} = useSWR(`/api/get-staff/${email}`, fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>; 
   
    const content = () => {

        if (data["result"].length == 0) return <div>Not found</div>
        console.log("data")
        console.log(data)
        return (
            <>
            <div>{data["result"][0]["tutorial"]}</div>
            <div>
            <Button>
              <Link href="/create-topic-preferences">
                <p>Create Topics</p>
              </Link>
            </Button>
            </div>
            </>
            
        )
    }

    return (
        <>
        <h1>Staff Dashboard</h1>
        {session ? session.user.name : ""}
        {content()}
        <button onClick={() => signOut()}>Sign out.</button>
        </>
    )    
}