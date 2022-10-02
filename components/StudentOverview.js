import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import styles from "../styles/StudentOverview.module.css";
import { useEffect, useState } from "react";
import sortGroupsBySize from "../util/sortGroupsBySize";

const StudentOverview = (props) => {
  const { tutorialId } = props;
  const [students, setStudents] = useState([]);
  const [tutorial, setTutorial] = useState([]);
  const [groups, setGroups] = useState([]);
  const [enableEdit, setEnableEdit] = useState(false);
  const [groupSize, setGroupSize] = useState(1);
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
    getStudents();
    getTutorial();
    getGroups();
  }, []);

  /**
   * @method updateGroups
   * @summary Use this function to check the selected settings and call the respective sorting algorithm
   */
  function updateGroups() {
    // At the moment we can only sort by group size
    if (groupAllocationSetting == "Manual Allocation" && groupSize > 0) {
      sortGroupsBySize({ tutorial, groupSize });
      setEnableEdit(false);
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
      <tr>
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
          <Table bordered className={`${styles.bootstrapTable}`} striped hover>
            <thead>
              <tr>
                <th>Student</th>
                <th>Group</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{students?.map((student) => studentCell(student))}</tbody>
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
  );
};

export default StudentOverview;
