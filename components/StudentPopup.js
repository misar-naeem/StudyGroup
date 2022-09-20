import { Button, Col, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "../styles/StudentPopup.module.css";
import { Loading } from "./Loading";

const StudentPopup = ({ showPopup, setShowPopup, size }) => {
  const handleProceed = () => {
    console.log("Student Added");
  };
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getStudents = async () => {
    fetch("/api/get-all-student")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data["result"]);
      });
  };

  const getStudentByEmail = async (email) => {
    fetch(`/api/get-student/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setStudentDetails(data["result"][0]);
      });
  };

  useEffect(() => {
    setLoading(true);
    getStudents();
    setLoading(false);
  }, [refresh]);

  function handleStudentChange(event) {
    const email = event.target.value;
    if (email !== "") {
      getStudentByEmail(email);
      setRefresh(!refresh);
      console.log(studentDetails);
    }
    else{
      console.log(studentDetails);
      setStudentDetails([]);
      setRefresh(!refresh);
    }
  }

  return (
    <>
      {!loading ? (
        <Modal show={showPopup} centered size={size}>
          <Modal.Body>
            <div className={styles.mBody}>
              <p className={`${styles.mHeading}`}>Add a student: </p>
              <div className="d-flex gap-4">
                <span>Student Email:</span>
                <select
                  className={styles.studentSelect}
                  onChange={(event) => handleStudentChange(event)}
                >
                  <option value="">Select</option>
                  {students.map((student) => (
                    <option key={student.email} value={student.email}>
                      {student.email}
                    </option>
                  ))}
                </select>
              </div>
              <Col className={styles.studentInfo}>
                {studentDetails.length !== 0 ? (
                  <Col className="p-3">
                    <span><b>Student Name:</b> {studentDetails.name}</span>
                    <br />
                    <span><b>Student Email:</b> {studentDetails.email}</span>
                    <br />
                    <span><b>Student Degree:</b> {studentDetails.degree}</span>
                    <br />
                    <span><b>Student Year:</b> {studentDetails.year}</span>
                  </Col>
                ) : <span>No student Info to display</span>}
              </Col>
              <div className="d-flex flex-row mt-4">
                <Button
                  className={`${styles.mainBtn} me-3`}
                  onClick={() => {
                    setShowPopup(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleProceed} className={`${styles.mainBtn}`}>
                  Confirm
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default StudentPopup;
