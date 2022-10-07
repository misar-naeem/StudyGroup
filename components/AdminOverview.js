import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import styles from "../styles/AdminOverview.module.css";
import { useEffect, useState } from "react";
import sortGroupsBySize from "../util/sortGroupsBySize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import BootstrapPopup from "./BootStrapPopUp";
import { Loading } from "./Loading";
import StudentPopup from "./StudentPopup";

const AdminOverview = (props) => {
  const { tutorialId } = props;
  const [students, setStudents] = useState([]);
  const [tutorial, setTutorial] = useState([]);
  const [groups, setGroups] = useState([]);
  const [enableEdit, setEnableEdit] = useState(false);
  const [groupSize, setGroupSize] = useState(1);
  const [showDeleteIcon, setshowDeleteIcon] = useState(false);
  const [showDeletePopup, setshowDeletePopup] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showStudentPopup, setShowStudentPopup] = useState(false);
  const [groupAllocationSetting, setGroupAllocationSetting] =
    useState("Manual Allocation");

  const getStudents = async () => {
    fetch("/api/get-all-student")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data["result"]);
      });
  };

  const getTutorial = async () => {
    fetch(`/api/get-tutorial/${tutorialId}`)
      .then((res) => res.json())
      .then((data) => {
        setGroupSize(data["result"][0]?.groupConfiguration?.groupSize);
        setTutorial(data["result"][0]);
      });
  };

  const getGroups = async () => {
    fetch(`/api/get-groups/${tutorialId}`)
      .then((res) => res.json())
      .then((data) => {
        setGroups(data["result"]);
      });
  };

  useEffect(() => {
    setLoading(true);
    getStudents();
    getTutorial();
    getGroups();
    setLoading(false);
  }, []);

  /**
   * @method updateGroups
   * @summary Use this function to check the selected settings and call the respective sorting algorithm
   */
  async function updateGroups() {
    // At the moment we can only sort by group size
    if (groupAllocationSetting == "Manual Allocation" && groupSize > 0) {
      await sortGroupsBySize({ tutorial, groupSize });
      setEnableEdit(false);
      getTutorial();
      getGroups();
    } else {
      alert(
        "This function has not been built yet or your group size is invalid."
      );
    }
  }

  const getGroup = (studentEmail) => {
    let groupData = {
      groupString: "Group not yet assigned",
      groupStatus: "Incomplete",
    };

    groups.find((group) =>
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

  const studentCell = (student) => {
    const studentGroup = getGroup(student?.email);

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
          <td></td>
        )}
        <td>{student.name}</td>
        <td>{studentGroup.groupString}</td>
        <td>
          <Button
            className={
              studentGroup.groupStatus == "Incomplete"
                ? styles.primInCompbtn
                : styles.primCompbtn
            }
          >
            Allocation {studentGroup.groupStatus}
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <>
      {!loading ? (
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
          <Tabs
            style={{ marginTop: "70px" }}
            defaultActiveKey="StudentsOverview"
            transition={false}
            className={`${styles.bootstrapTabContainer} mb-3`}
            id="student-tabs"
          >
            <Tab
              eventKey="StudentsOverview"
              title="Students Overview"
              tabClassName={`${styles.bootstrapSingleTab}`}
            >
              <div className={`${styles.bootstrapTabContent}`}>
                <Table className={`${styles.bootstrapTable}`} striped hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Student</th>
                      <th>Group</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {students?.map((student) => studentCell(student))}
                  </tbody>
                </Table>
              </div>
            </Tab>

            <Tab
              eventKey="GroupOverview"
              title="Group Overview"
              tabClassName={`${styles.bootstrapSingleTab}`}
            >
              {enableEdit && (
                <Button
                  style={{
                    marginRight: "50px",
                    marginBottom: "10px",
                    float: "right",
                  }}
                  onClick={() => setEnableEdit(!enableEdit)}
                >
                  {"Cancel"}
                </Button>
              )}
              <Button
                style={{
                  marginRight: "50px",
                  marginBottom: "10px",
                  float: "right",
                }}
                onClick={() => {
                  if (enableEdit) {
                    updateGroups();
                  } else {
                    setEnableEdit(!enableEdit);
                  }
                }}
              >
                {enableEdit ? "Save Changes" : "Edit"}
              </Button>
              {!enableEdit ? (
                <div className={`${styles.bootstrapTabContent}`}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Group Allocation Setting</th>
                        <th>Group Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Button>Manual Allocation</Button>
                        </td>
                        <td>0{groupSize}</td>
                      </tr>
                    </tbody>
                  </Table>

                  <Accordion className={styles.Accordion}>
                    {groups.map((group, index) => (
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                          <div className="d-flex gap-5 w-100">
                            <span>Group {group?.groupNumber}</span>
                            <span className="ms-5">
                              0{group?.students?.length} students
                            </span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Table striped borderless hover>
                            <thead>
                              <tr>
                                <th>Student Email</th>
                                <th>Student Name</th>
                              </tr>
                            </thead>
                            <tbody>
                              {group?.students.map((student) => (
                                <tr>
                                  <td>{student?.email}</td>
                                  <td>{student?.name}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              ) : (
                <div style={{ textAlign: "left", marginLeft: "40%" }}>
                  <p>
                    <>Group Size: </>
                    <>
                      <input
                        type="number"
                        min="1"
                        value={groupSize}
                        onChange={(event) => {
                          if (groupSize > 0) {
                            setGroupSize(Number(event.target.value));
                          }
                        }}
                      ></input>{" "}
                      Students/ Group
                    </>
                  </p>
                  <p>
                    <>Group Allocation Setting: </>
                    <>
                      <select
                        value={groupAllocationSetting}
                        onChange={(event) =>
                          setGroupAllocationSetting(event.target.value)
                        }
                      >
                        <option>Automatic</option>
                        <option>Manual Allocation</option>
                      </select>
                      {groupAllocationSetting == "Automatic" && (
                        <p style={{ marginTop: "20px" }}>
                          Sort By:{"  "}
                          <select>
                            <option>Student Topic Preferences</option>
                            <option>Diverse Year Groups</option>
                            <option>Divserse Skill Set</option>
                          </select>
                        </p>
                      )}
                    </>
                  </p>
                </div>
              )}
            </Tab>
          </Tabs>
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
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AdminOverview;
