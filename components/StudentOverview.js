import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import styles from "../styles/StudentOverview.module.css";
import { useState } from "react";
import sortGroupsBySize from "../util/sortGroupsBySize";

const StudentOverview = (props) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [minGroupSize, setMinGroupSize] = useState(1);
  const [maxGroupSize, setMaxGroupSize] = useState(2);
  const [groupAllocationSetting, setGroupAllocationSetting] =
    useState("Manual Allocation");
  const { groups, tutorial } = props;

  /**
   * @method updateGroups
   * @summary Use this function to check the selected settings and call the respective sorting algorithm
   */
  function updateGroups() {
    // At the moment we can only sort by group size
    if (
      groupAllocationSetting == "Manual Allocation" &&
      minGroupSize < maxGroupSize &&
      minGroupSize > 0 &&
      maxGroupSize > 0
    ) {
      sortGroupsBySize(tutorial, minGroupSize, maxGroupSize);
      setEnableEdit(false);
    } else {
      alert(
        "This function either has not been built yet or your min size is not greater than your max size"
      );
    }
  }

  const getGroup = (studentEmail) => {
    let groupData = {
      groupString: "Group N/A",
      groupStatus: "Incomplete",
    };

    groups.find((group) =>
      group.students.find((student) => {
        if (student.email == studentEmail) {
          return (
            (groupData.groupString = `Group ${group?.groupNumber}`),
            (groupData.groupStatus = "Complete")
          );
        }
      })
    );

    return groupData;
  };

  const studentCell = (student) => {
    const studentGroup = getGroup(student);

    return (
      <tr>
        <td>{student}</td>
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
      defaultActiveKey="StudentsOverview"
      transition={false}
      className={`${styles.bootstrapTabContainer} mb-3`}
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
            <tbody>
              {tutorial[0]?.students?.map((student) => studentCell(student))}
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
                  <th>Min Group Size</th>
                  <th>Max Group Size</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Button>Manual Allocation</Button>
                  </td>
                  <td>0{minGroupSize} Students</td>
                  <td>0{maxGroupSize} Students</td>
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
                        0{group?.students?.length}/0{maxGroupSize} students
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
              <>Min Group Size: </>
              <>
                <input
                  type="number"
                  min="1"
                  value={minGroupSize}
                  onChange={(event) =>
                    setMinGroupSize(Number(event.target.value))
                  }
                ></input>{" "}
                Students/ Group
              </>
            </p>
            <p>
              <>Max Group Size: </>
              <>
                <input
                  type="number"
                  min="1"
                  value={maxGroupSize}
                  onChange={(event) =>
                    setMaxGroupSize(Number(event.target.value))
                  }
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
