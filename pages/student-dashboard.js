import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import useSWR from 'swr';
import { signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from 'next/router'
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';

const TutorialLink = ({tutorial}) => {
    return (
    <Button>
        <Link href="/add-student-preferences">
          <p>{tutorial}</p>
        </Link>
    </Button>
    )
}

export default function StudentDashboard() {
    const { data: session } = useSession();
    const router = useRouter()

    // Literal jank if someone knows auth and routing feel free to fix
    useEffect(() => {
        if (!session) {
            router.push('/student-login')
        }
    })

    const fetcher = (url) => fetch(url).then((res) => res.json());

    // Get student info from database
    var email = "";
    if (session) { email = session.user.email }
    const {data, error} = useSWR(`/api/get-student/${email}`, fetcher);

    if (error || data?.error) return <div>Student Account not Registered, Contact Your Tutor to be Added to StudyGroup</div>;
    if (!data) return <div>loading...</div>; 
   
    const content = () => {

        if (data["result"].length == 0) return <div>Not found</div>
        return (
            <>
            <div>{data["result"][0]["tutorials"].map((value, index)=>{return <TutorialLink tutorial={value}/>})}</div>
            </>
            
        )
    }

    return (
        <>
        <h1>Student Dashboard</h1>
        {session ? session.user.name : ""}
        {content()}
        <button onClick={() => signOut()}>Sign out.</button>
        </>
    )    
}
