import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import StudentStaticSubjectBox from "../components/StudentStaticSubjectBox";
import { Loading } from "../components/Loading";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import StudentNavBar from "../components/StudentNavBar";


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
  const { data, error } = useSWR(`/api/get-tutorial-student/${email}`, fetcher);
  if (error || data?.error)
    return (
      <div>
        Student Account not Registered, Contact Your Tutor to be Added to
        StudyGroup
      </div>
    );
  if (!data) return <Loading />;

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
        <Row className="ps-5 my-2 gap-5" xs={3}>
          {
            data["result"].map((value, index) => {
              return (
                <Col key={index}>
                  <button style={{ backgroundColor: !value.topicsReleased ? "#eee" : "white", color: "black", border: "none", borderRadius: "10px", width: "400px" }}
                    onClick={() => {
                      return (
                        router.push(`/tutorial?tutorialId=${value.tutorialId}&student=${email}`)
                      )
                    }}
                    disabled={!value.topicsReleased}
                  >
                    <StudentStaticSubjectBox
                      heading={"Tutorial " + value.tutorialId[value.tutorialId?.length - 1]}
                      subheading={!value.topicsReleased ? "This subject is not accessabile yet" : null}
                      icon="/../public/images/subject-icon.jpg"
                      tutorialId={value.tutorialId}
                    />
                  </button>
                </Col>
              )
            })
          }
        </Row>
      </div>
      <button onClick={() => signOut()}>Sign out.</button>
    </>
  );
}
