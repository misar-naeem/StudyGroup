import { Button, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "../styles/StudentPopup.module.css";
import { Loading } from "./Loading";
const StudentPopup = ({ showPopup, setShowPopup, size }) => {
  const handleProceed = () => {
    console.log("Student Added");
  };
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
//   const [studentDetails, setStudentDetails] = useState([]);

  const getStudents = async () => {
    fetch("/api/get-all-student")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data["result"]);
      });
  };

  useEffect(() => {
    setLoading(true);
    getStudents();
    setLoading(false);
  }, []);
  
  function handleStudentChange(event)
  {
    console.log(event.target.value);
  }

  return (
    <>
      {!loading ? (
        <Modal show={showPopup} centered size={size}>
          <Modal.Body>
            <div className={styles.mBody}>
              <p className={`${styles.mHeading}`}>Add a student: </p>
              <div className="d-flex gap-4">
                <span>Student ID:</span>
                <select className={styles.studentSelect} onChange={(event) =>handleStudentChange(event)}>
                  <option value="">Select</option>
                  {students.map((student) => (
                    <option key={student.studentID} value={student.studentID} >
                      {student.studentID}
                    </option>
                  ))}
                </select>
              </div>
              <p className={styles.studentInfo}>
                Summary of student details here
              </p>
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
