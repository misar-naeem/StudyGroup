import styles from "../styles/Home.module.css";
import Link from "next/link";
import useSWR from "swr";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import StudentStaticSubjectBox from "../components/StudentStaticSubjectBox";
import { Loading } from "../components/Loading";
import { Col } from "react-bootstrap";
import { useEffect } from "react";

const TutorialLink = ({tutorial, student}) => {
  return (
  <div>
  <Link href={`/add-student-preferences?tutorial=${tutorial}&student=${student}`}>
    <a>
    <StudentStaticSubjectBox
        heading={tutorial}
        subheading="Admin Contact Details"
        icon="/../public/images/subject-icon.jpg"
    />
    </a>
  </Link>
  </div>
);
};

export default function StudentDashboard() {
    const { data: session } = useSession();
    const router = useRouter()

    // Literal jank if someone knows auth and routing feel free to fix
    useEffect(() => {
        if (!session) {
            router.push('/student-login')
        }
    }, [])

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
          <div>{data["result"][0]["tutorials"].map((value, index)=>{return <TutorialLink tutorial={value} student={email}/>})}</div>
          </>
      )
    }

  if (!data) return <div><Loading /></div>;

  const hardcodedSubjects = () => {
    return (
      <>
      <StudentStaticSubjectBox
          heading="Subject Title"
          subheading="Admin Contact Details"
          icon="/../public/images/subject-icon.jpg"
        />
        <StudentStaticSubjectBox
          heading="Subject Title"
          subheading="Admin Contact Details"
          icon="/../public/images/subject-icon.jpg"
        />
        <StudentStaticSubjectBox
          heading="Subject Title"
          subheading="Admin Contact Details"
          icon="/../public/images/subject-icon.jpg"
        />
      </>
    )
  }

  return (
    <>
      <h1>Student Dashboard</h1>
      {/* {session ? session.user.name : ""}
        {content()} */}
      <h2 className={styles.h2}>
        <span className={styles.span}>Subjects</span>
      </h2>
      <Col className="d-flex justify-content-evenly">
      {content()}
      </Col>
      <button onClick={() => signOut()}>Sign out.</button>
    </>
  );
}
