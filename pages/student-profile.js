import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import styles from "../styles/StudentProfile.module.css";
import { Loading } from "../components/Loading";
import StudentNavBar from "../components/StudentNavBar";
import Tutorial from "../models/Tutorial";
import Staff from "../models/Staff";
import Student from "../models/Student";
import { getSession } from "next-auth/react"
import connectMongo from "../util/mongodb";

export async function getServerSideProps({ req }) {

  const session = await getSession({ req })

  if (session) {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    var result = await Student.find({ email: session.user.email })
    const studentInfo = JSON.parse(JSON.stringify(result))[0]

    const tutorials = []
    const tutorialNames = Array.from(studentInfo["tutorials"])
    for (var i = 0; i < tutorialNames.length; i++) {
      var newResult = await Tutorial.find({ tutorialId: tutorialNames[i] }).select("subject tutorialId")
      var staffResult = await Staff.find({ tutorial: tutorialNames[i] })
      var tutorialInfo = JSON.parse(JSON.stringify(newResult))[0];
      var staffInfo = JSON.parse(JSON.stringify(staffResult))[0];
      tutorialInfo["staffName"] = staffInfo["name"]
      tutorialInfo["staffEmail"] = staffInfo["email"]
      tutorials.push(tutorialInfo)
    }


    return {
      props: { studentDetails: studentInfo, tutorials: tutorials }
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/student-dashboard"
      }
    }
  }
}


const Enrolment = ({ tutorial }) => {
  let tut = tutorial["tutorialId"]
  let tutorialId = tut[tut.length - 1]
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {tutorial && (<div className={`${styles.listgroup} p-3 w-100 ms-3 d-flex flex-column align-items-center`}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <h3>{tutorial["subject"]}</h3>
          <h4>{"Tutorial " + tutorialId}</h4>
        </div>
        <div className="d-flex align-items-center justify-content-between w-100">
          <p className="ms-3">{tutorial["staffName"]}</p>
          <p>{tutorial["staffEmail"]}</p>
        </div>
      </div>)}
    </div>
  )
}


export default function StudentProfile({ studentDetails, tutorials }) {

  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();


  useEffect(() => {
    setLoading(true);
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
          <div className="ps-5" style={{ marginLeft: "100px" }}>
            <div>
              <h1 style={{ width: "100%", display: "flex", margin: "50px", marginLeft: "100px" }}>
                My Student Profile
              </h1>
            </div>

            <div className="d-flex align-items-center" style={{ marginLeft: "50px" }}>
              <Image
                className={styles.photo}
                style={{ margin: "30px", marginLeft: 50, borderRadius: "50%" }}
                src="/icons/profileIcon.png"
                thumbnail
                width={400}
                height={300}
              />
              <div className="col-5" >
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
            <div className={`${styles.enrollments} mx-5 p-5 mb-5`} >
              {tutorials.length > 0 ? (tutorials.map((value, index) => {
                return <Enrolment tutorial={value} />;
              })) : <span className={`${styles.specialText} d-flex align-items-center justify-content-center`}>You have not been enrolled in any of the tutorial yet!</span>}
            </div>

          </div>) : (<Loading />)
      }
    </>
  );
}
