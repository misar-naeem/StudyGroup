import styles from "../styles/Home.module.css";
import Link from "next/link";
import useSWR from "swr";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import StudentStaticSubjectBox from "../components/StudentStaticSubjectBox";
import { Loading } from "../components/Loading";
import { Row } from "react-bootstrap";
import { useEffect } from "react";
import StudentNavBar from "../components/StudentNavBar";
const TutorialLink = ({ tutorial, student }) => {
  return (
    <Button>
      <Link
        href={`/add-student-preferences?tutorial=${tutorial}&student=${student}`}
      >
        <p>{tutorial}</p>
      </Link>
    </Button>
  );
};

export default function StudentDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  // Literal jank if someone knows auth and routing feel free to fix
  useEffect(() => {
    if (!session) {
      router.push("/student-login");
    }
  }, []);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  // Get student info from database
  var email = "";
  if (session) {
    email = session.user.email;
  }
  const { data, error } = useSWR(`/api/get-student/${email}`, fetcher);

  if (error || data?.error)
    return (
      <div>
        Student Account not Registered, Contact Your Tutor to be Added to
        StudyGroup
      </div>
    );
  if (!data) return <Loading />;

  const content = () => {
    if (data["result"].length == 0) return <div>Not found</div>;
    return (
      <>
        <div>
          {data["result"][0]["tutorials"].map((value, index) => {
            return <TutorialLink tutorial={value} student={email} />;
          })}
        </div>
      </>
    );
  };



  return (
    <>
      <StudentNavBar />
      <div className={styles.studentLayout}>
        <div className={`d-flex flex-column justify-content-center p-3 ps-5`}>
          <h1 className="p-3">
            <span className={styles.span}>Subjects</span>
          </h1>
          <hr />
        </div>
        <Row className="d-flex gap-5 ps-5 my-2">
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
        </Row>
        <Row className="d-flex gap-5 ps-5 my-3">
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
        </Row>
      </div>
      <button onClick={() => signOut()}>Sign out.</button>
    </>
  );
}
