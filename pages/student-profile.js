import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import styles from "../styles/StudentProfile.module.css";
import { Loading } from "../components/Loading";
import StudentNavBar from "../components/StudentNavBar";
import useSWR from "swr";
import ListGroup from "react-bootstrap/ListGroup";

// get server props




const Enrolment = ({tutorial, subject}) => {
  const [tutorialInfo, setTutorialInfo] = useState();

  const [loading, setLoading] = useState(false);

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(`/api/get-staff?tutorial=${tutorial}`, fetcher);

  if (error || data?.error)
  return (
    <div>
      Tutorial not assigned to staff member.
    </div>
  );
  if (!data) return <p>Loading...</p>;
  if (data["result"].length == 0) return <div>Not found</div>;

  const staffName = data["result"][0]["name"]
  const staffEmail = data["result"][0]["email"]

  return (  
  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <div className={`${styles.listgroup} p-3 w-100 d-flex justify-content-between ms-3 gap-5`}>
      <h3>Subject Name - {tutorial}</h3>
      <h4>{staffName} - {staffEmail}</h4>
    </div>
  
  {/* <ListGroup className={styles.listgroup} horizontal>
    <ListGroup.Item
      className="col-xs-3 list-group-item"
      style={{ width: "400px" }}
    >
      {`Subject Name - ${tutorial}`}
    </ListGroup.Item>
    <ListGroup.Item
      className="col-xs-3 list-group-item"
      style={{ width: "200px" }}
    >
      41203
    </ListGroup.Item>
    <ListGroup.Item style={{ width: "200px" }}>
      {`${staffName} - ${staffEmail}`}
    </ListGroup.Item>
  </ListGroup> */}
  </div>
)

}


export default function StudentProfile() {
  const [studentDetails, setStudentDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [tutorials, setTutorials] = useState([]);
  // const [enrollments, setEnrollments] = useState([]);
  const { data: session } = useSession();


  const getStudentByEmail = async (email) => {
    fetch(`/api/get-student/${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data["result"][0])
        setStudentDetails(data["result"][0]);
        setTutorials(data["result"][0]["tutorials"])
      });
  };
  // const getTutorial = async (tutorialId) => {
  //   fetch(`/api/get-tutorial/${tutorialId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         setTutorial(data["result"][0]);
  //       }
  //     });
  // };

  useEffect(() => {
    setLoading(true);
    if (session) {
      getStudentByEmail(session.user.email);
    }
    setLoading(false);
    // else{
    //   router.push('/student-login')
    // }
  }, [session]);

  if (!session) {
    return <Loading />
  }

  return (
    <>
      <StudentNavBar />
      {
        studentDetails && !loading ? (
          <div className="ms-5 ps-5">
            <div>
              <h1 style={{ width: "100%", display: "flex", margin: "50px" }}>
                My Student Profile
              </h1>
            </div>

            <div className="d-flex align-items-center">
              <Image
                className={styles.photo}
                style={{ margin: "30px", marginLeft: 50 }}
                src="https://thumbs.dreamstime.com/b/closeup-super-mario-character-nintendo-platform-game-video-red-background-photographed-site-screen-149088103.jpg"
                thumbnail
                width={400}
                height={300}
              />
              <div className="col-5">
                <Form
                  className="mr-sm"
                  style={{ width: "100%", marginTop: 50, marginLeft: 100 }}
                >
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Form.Label column sm="2">
                      <span style={{ fontWeight: "bold" }}> Student Name: </span>
                    </Form.Label>
                    <Col sm="10" className="mt-3">
                      {studentDetails?.name}
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextStudyYear"
                  >
                    <Form.Label column sm="2">
                      <span style={{ fontWeight: "bold" }}> Study Year: </span>
                    </Form.Label>
                    <Col sm="10" className="mt-3">
                      <Form.Control plaintext readOnly defaultValue={studentDetails?.year} />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextEmail"
                  >
                    <Form.Label column sm="2">
                      <span style={{ fontWeight: "bold" }}> Student Email: </span>
                    </Form.Label>
                    <Col sm="10" className="mt-3">
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={studentDetails?.email}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextCourse"
                  >
                    <Form.Label column sm="2">
                      <span style={{ fontWeight: "bold" }}> Course: </span>
                    </Form.Label>
                    <Col sm="10" className="mt-2">
                      Bachelors Of {studentDetails?.degree}
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </div>
            <div className={`${styles.enrollments} mx-5 p-5`}>
              <h4 className="ms-1">
                Current Enrollments:
              </h4>
              <div className={`${styles.listgroup} p-3 w-100 d-flex justify-content-between ms-3 gap-5`}>
                <h3>Subject Name</h3>
                <h3>41023</h3>
              </div>
              <div className={`${styles.listgroup} p-3 w-100 d-flex justify-content-between ms-3 gap-5`}>
                <h3>Subject Name</h3>
                <h3>41023</h3>
              </div>
              <div className={`${styles.listgroup} p-3 w-100 d-flex justify-content-between ms-3 gap-5`}>
                <h3>Subject Name</h3>
                <h3>41023</h3>
              </div>
              {tutorials.map((value, index) => {
                return <Enrolment tutorial={value} />;
              })}
            </div>
            
          </div>) : (<Loading />)
      }
    </>
  );
}
