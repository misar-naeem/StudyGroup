import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import styles from "../styles/AdminOverview.module.css";
import { useState } from 'react';
import BootstrapPopup from './BootStrapPopUp';
import StudentPopup from "../components/StudentPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
const StudentOverviewTable = ({ students, studentGroups }) => {
  const [showDeleteIcon, setshowDeleteIcon] = useState(false);
  const [showDeletePopup, setshowDeletePopup] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [showStudentPopup, setShowStudentPopup] = useState(false);
  const getGroup = (studentEmail) => {
    let groupData = {
      groupString: "Group not yet assigned",
      groupStatus: "Incomplete",
    };

    studentGroups.find((group) =>
      group.students.find((student) => {
        if (student.email == studentEmail) {
          return (
            (groupData.groupString = `Group ${group.groupNumber}`),
            (groupData.groupStatus = "Complete")
          );
        }
      })
    );
    return groupData;
  };
  return (
    <>
      {
        students ? (
          <div>
            <span
              className={`${styles.editIcon} d-flex gap-2 align-items-center`}
            >
              {!showDeleteIcon ? (
                <FontAwesomeIcon
                  icon={faEdit}
                  className="fa-2x"
                  onClick={() => setshowDeleteIcon(!showDeleteIcon)}
                  style={{ marginTop: "20px", marginRight: "20px" }}
                />
              ) : (
                <>
                  <Button
                    className={styles.addStudentBtn}
                    onClick={() => setShowStudentPopup(!showStudentPopup)}
                    style={{ marginTop: "20px", marginRight: "20px" }}
                  >
                    Add Student
                  </Button>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="fa-2x"
                    onClick={() => setshowDeleteIcon(!showDeleteIcon)}
                    style={{ marginTop: "20px", marginRight: "20px" }}
                  />
                </>
              )}
            </span>

            <Table striped borderless hover>
              <thead>
                <tr>
                  {showDeleteIcon && <th/>}
                  <th>Student Name</th>
                  <th>Group</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  students?.map((student) => {
                    return (
                      <tr key={student._id}>
                        {showDeleteIcon ? (
                          <td>
                            <Button
                              variant="danger"
                              className={styles.deleteIcon}
                              onClick={() => {
                                setshowDeletePopup(true);
                                setStudentName(student.name);
                              }}
                            >
                              <FontAwesomeIcon icon={faMinus} className="fa-1x" />
                            </Button>
                          </td>
                        ) : (
                          null
                        )}
                        <td>{student.name}</td>
                        <td>{getGroup(student.email).groupString}</td>
                        <td>
                          <Button
                            className={
                              getGroup(student.email).groupStatus == "Incomplete"
                                ? styles.primInCompbtn
                                : styles.primCompbtn
                            }
                          >
                            Allocation {getGroup(student.email).groupStatus}
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>) : <span className='d-flex align-items-center justify-content-center'>No students have been registered to this tutorial :(</span>
      }
      <BootstrapPopup
        showPopup={showDeletePopup}
        setShowPopup={setshowDeletePopup}
        title="Delete Student"
        body={`Are you sure you want to remove "${studentName}" ?`}
        size={"md"}
        proceedBtnRequired={true}
        proceedBtnName="Confirm"
        closeBtnName="Cancel"
      />
      <StudentPopup
        showPopup={showStudentPopup}
        setShowPopup={setShowStudentPopup}
        size={"md"}
      />
    </>
  )
}

export default StudentOverviewTable


