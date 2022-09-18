import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import styles from "../styles/StudentOverview.module.css";
import { useState } from "react";
// import Staff from "models/Staff.js";
// import connectMongo from "../util/mongodb";

const StudentOverview = () => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [minGroupSize, setMinGroupSize] = useState(1);
  const [maxGroupSize, setMaxGroupSize] = useState(1);
  const [groupAllocationSetting, setGroupAllocationSetting] =
    useState("Manual Allocation");
  // const tutorials = ["Tutorial 1", "Tutorial 2", "Tutorial 3"];
  const [tutorials, setTutorials] = useState([""]);

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
                <th>Student Name</th>
                <th>Group</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Student Name</td>
                <td>Group 1</td>
                <td>
                  <Button className={styles.primCompbtn}>
                    Allocation Complete
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Student Name</td>
                <td>Group 2</td>
                <td>
                  <Button className={styles.primInCompbtn}>
                    Allocation Incomplete
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Student Name</td>
                <td>Group 3</td>
                <td>
                  <Button className={styles.primCompbtn}>
                    Allocation Complete
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Tab>

      <Tab
        eventKey="GroupOverview"
        title="Group Overview"
        tabClassName={`${styles.bootstrapSingleTab}`}
      >
        <Button
          style={{
            marginRight: "50px",
            marginBottom: "10px",
            float: "right",
          }}
          onClick={() => setEnableEdit(!enableEdit)}
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
                  <td>03 Students</td>
                  <td>05 Students</td>
                </tr>
              </tbody>
            </Table>
            <Accordion className={styles.Accordion}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="d-flex gap-5 w-100">
                    <span>Group 1</span>
                    <span className="ms-5"> 03/05 student</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped borderless hover>
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <div className="d-flex gap-5 w-100">
                    <span>Group 2</span>
                    <span className="ms-5"> 04/05 student</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped borderless hover>
                    <thead>
                      <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                      <tr>
                        <td>1111111</td>
                        <td>Student Name</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ) : (
          <div style={{ textAlign: "left", marginLeft: "40%" }}>
            <p>
              <>Tutorial: </>
              <>
                <select>
                  {tutorials.map((tutorial) => (
                    <option>{tutorial}</option>
                  ))}
                </select>
              </>
            </p>
            <p>
              <>Min Group Size: </>
              <>
                <input
                  type="number"
                  min="1"
                  value={minGroupSize}
                  onChange={(event) => setMinGroupSize(event.target.value)}
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
                  onChange={(event) => setMaxGroupSize(event.target.value)}
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
