import Head from "next/head";
import Link from "next/link";
import { signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "../styles/StudentProfile.module.css";
import { Loading } from "../components/Loading";
import useSWR from "swr";

const Enrolment = ({tutorial}) => {

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
  <ListGroup className={styles.listgroup} horizontal>
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
  </ListGroup>
  </div>
)

}


export default function StudentProfile() {
  const [studentDetails, setStudentDetails] = useState([]);
  const { data: session } = useSession();
  const router = useRouter()

  console.log("a session")
  console.log(session)

  const getStudentByEmail = async (email) => {
    fetch(`/api/get-student/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setStudentDetails(data["result"][0]);
      });
  };

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/student-login");
  //   }
  // }, []);

  if (session) {
    getStudentByEmail(session.user.email);
  }

  if (studentDetails == 0) { return <Loading />}

  return (
    <div>
      <div>
        <h1 style={{ width: "100%", display: "flex", margin: "40px" }}>
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
              <Col sm="10">
                <Form.Control
                  className="styles.form"
                  plaintext
                  readOnly
                  defaultValue={studentDetails?.name}
                />
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
              <Col sm="10">
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
              <Col sm="10">
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
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={`Bachelors of ${studentDetails?.degree}`}
                />
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
      <h4 style={{ width: "100%", display: "flex", marginLeft: 410 }}>
        Current Enrollments:
      </h4>
      {studentDetails["tutorials"].map((value, index) => {
        return <Enrolment tutorial={value} />;
      })}
    </div>
  )
}
