import styles from "../styles/Home.module.css";
import Link from "next/link";
import useSWR from "swr";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import StudentStaticSubjectBox from "../components/StudentStaticSubjectBox";
import { Loading } from "../components/Loading";
import { Row, Modal } from "react-bootstrap";
import { useEffect } from "react";
import StudentNavBar from "../components/StudentNavBar";

const fetcher = (url) => fetch(url).then((res) => res.json());

const TutorialLink = ({ tutorial, student }) => {

  const getStaff = useSWR(`/api/get-staff?tutorial=${tutorial}`, fetcher);
  const staffData = getStaff['data']
  const staffError = getStaff['error']

  const getTutorial = useSWR(`/api/get-tutorial/${tutorial}`, fetcher);
  const tutData = getTutorial['data']
  const tutError = getTutorial['error']

  if (staffError || staffData?.error)
  return (
    <div>
      Tutorial not assigned to staff member.
    </div>
  );
  if (!staffData) return <p>Loading...</p>;
  if (staffData["result"].length == 0) return <div>Not found</div>;

  const staffName = staffData["result"][0]["name"]
  const staffEmail = staffData["result"][0]["email"]

  if (tutError || tutData?.error)
  return (
    <div>
      Tutorial not assigned to staff member.
    </div>
  );
  if (!tutData) return <p>Loading...</p>;
  if (tutData["result"].length == 0) return <div>Not found</div>;

  const subject = tutData["result"][0]["subject"]

  return (
    <StudentStaticSubjectBox
        heading={`${subject} - ${tutorial}`}
        subheading={<p>Staff - {staffName}<br/>{staffEmail}</p>}
        icon="/../public/images/subject-icon.jpg"
        link={`/add-student-preferences?subject=${subject}&tutorial=${tutorial}&student=${student}`}
    />  
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
          {content()}
        </Row>
      </div>
      <button onClick={() => signOut()}>Sign out.</button>
    </>
  );
}
