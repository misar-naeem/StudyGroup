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

const TutorialLink = ({ tutorial }) => {
  return (
    <Button>
      <Link href="/add-student-preferences">
        <p>{tutorial}</p>
      </Link>
    </Button>
  );
};

export default function StudentProfile() {
  const [studentDetails, setStudentDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession();


  const getStudentByEmail = async (email) => {
    fetch(`/api/get-student/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setStudentDetails(data["result"][0]);
      });
  };

    useEffect(() => {
    if (session) {
      setLoading(true);
      getStudentByEmail(session.user.email);
      setLoading(false);
    }
    // else{
    //   router.push('/student-login')
    // }
  }, []);

  return (
    <>
    {
      studentDetails !==  0 && !loading ? (
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
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ListGroup className={styles.listgroup} horizontal>
          <ListGroup.Item
            className="col-xs-3 list-group-item"
            style={{ width: "400px" }}
          >
            Subject Name
          </ListGroup.Item>
          <ListGroup.Item
            className="col-xs-3 list-group-item"
            style={{ width: "200px" }}
          >
            41203
          </ListGroup.Item>
          <ListGroup.Item style={{ width: "200px" }}>
            <a href="https://www.google.com/">
              <p>Admin Details Link</p>
            </a>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ListGroup className={styles.listgroup} horizontal>
          <ListGroup.Item
            className="col-xs-3 list-group-item"
            style={{ width: "400px" }}
          >
            Subject Name
          </ListGroup.Item>
          <ListGroup.Item
            className="col-xs-3 list-group-item"
            style={{ width: "200px" }}
          >
            41203
          </ListGroup.Item>
          <ListGroup.Item style={{ width: "200px" }}>
            <a href="https://www.google.com/">
              <p>Admin Details Link</p>
            </a>
          </ListGroup.Item>
        </ListGroup>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ListGroup className={styles.listgroup} horizontal>
          <ListGroup.Item
            className="col-xs-3 list-group-item"
            style={{ width: "400px" }}
          >
            Subject Name
          </ListGroup.Item>
          <ListGroup.Item
            className="col-xs-3 list-group-item"
            style={{ width: "200px" }}
          >
            41203
          </ListGroup.Item>
          <ListGroup.Item style={{ width: "200px" }}>
            <a href="https://www.google.com/">
              <p>Admin Details Link</p>
            </a>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>):(<Loading />)
    }
    </>
  );
}
