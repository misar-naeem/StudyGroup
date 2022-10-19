import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import styles from "../styles/AdminOverview.module.css";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";
import StudentOverviewTable from "./StudentOverviewTable";
import WarningPopup from "./WarningPopup";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import GroupEditPopup from "./GroupEditPopup";

import sortGroupsBySize from "../util/sortGroupsBySize";
import sortGroupsByTopic from "../util/sortByTopic";
import sortGroupsBySimilarity from "../util/sortGroupsBySimilarity";



const AdminOverview = (props) => {
  const { tutorialId } = props;
  const [students, setStudents] = useState([]);
  const [tutorial, setTutorial] = useState([]);
  const [groups, setGroups] = useState([]);
  const [enableEdit, setEnableEdit] = useState(false);
  const [groupDetails, setGroupDetails] = useState(0);
  const [studentDetails, setStudentDetails] = useState();
  const [groupSize, setGroupSize] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tutorialStudents, setTutorialStudents] = useState([]);
  const [topics, setTopics] = useState({
    topicsReleased: false,
    topicsData: [],
  });
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [groupAllocationSetting, setGroupAllocationSetting] =
    useState("Random Allocation");
  const [automaticAllocationSetting, setAutomaticAllocationSetting] = useState("Student Topic Preferences")

  const getStudents = async () => {
    fetch(`/api/get-students-in-tutorial?tutorial=${tutorialId}`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data["result"]);
      });
  };

  const getTutorial = async () => {
    fetch(`/api/get-tutorial/${tutorialId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data["result"][0]?.topicsReleased) {
            setTopics({
              ...topics,
              topicsReleased: data["result"][0].topicsReleased,
              topicsData: data["result"][0].topics,
            });
          }
          data["result"][0]?.groupConfiguration?.groupSize &&
            setGroupSize(data["result"][0]?.groupConfiguration?.groupSize);
          setTutorial(data["result"][0]);
        }
      });
  };

  const getGroups = async () => {
    fetch(`/api/get-groups/${tutorialId}`)
      .then((res) => res.json())
      .then((data) => {
        setGroups(data["result"]);
      });
  };

  const getTutorialStudents = async () => {
    fetch(`/api/get-students-in-tutorial?tutorial=${tutorialId}`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data["result"]);
      });
  };

  useEffect(() => {
    setLoading(true);
    getStudents();
    getTutorial();
    getGroups();
    getTutorialStudents();
    setLoading(false);
  }, []);

  /**
   * @method updateGroups
   * @summary Use this function to check the selected settings and call the respective sorting algorithm
   */
  async function updateGroups() {
    // At the moment we can only sort by group size
    if (groupAllocationSetting == "Random Allocation" && groupSize > 0) {

      await sortGroupsBySize({ tutorial, groupSize, students });
      setEnableEdit(false);
      getTutorial();
      getGroups();
    } else {
      if (automaticAllocationSetting == "Student Topic Preferences") {
        await sortGroupsByTopic({tutorial, groupSize, students: students});
        setEnableEdit(false);
        getTutorial();
        getGroups();

      } else if (automaticAllocationSetting == "Similar Year Groups") {
        await sortGroupsBySimilarity({tutorial, groupSize, students, similarityKey: "year"})
        setEnableEdit(false);
        getTutorial();
        getGroups();
      } else if (automaticAllocationSetting == "Similar Degree Groups") {
        await sortGroupsBySimilarity({tutorial, groupSize, students, similarityKey: "degree"})
        setEnableEdit(false);
        getTutorial();
        getGroups();
      } else {
        alert(
          "This function has not been built yet or your group size is invalid."
        );
      }
    }
  }

  /**
   * @method handleSelectDeleteAllGroups
   * @summary Use this function to confirm that the user wants to delete all groups, and then call the delete groups function
   */
  async function handleSelectDeleteAllGroups() {
    const JSONdata = JSON.stringify({ tutorialId: tutorialId });
    const endpoint = "/api/delete-group-data";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    await fetch(endpoint, options);

    setEnableEdit(false);
    getTutorial();
    getGroups();
  }

  return (
    <>
      {topics.topicsReleased ? null : <WarningPopup tutorialId={tutorialId} />}
      {!loading ? (
        <div>
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
                <StudentOverviewTable
                  students={students}
                  studentGroups={groups}
                  tutorialId={tutorialId}
                />
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
                  marginRight: "30px",
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
              {enableEdit && (
                <Button
                  style={{
                    marginRight: "30px",
                    float: "right",
                  }}
                  onClick={() => handleSelectDeleteAllGroups()}
                >
                  {"Clear all groups"}
                </Button>
              )}
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
                          <label>{groupAllocationSetting}</label>
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
                                <th>Degree</th>
                                <th>Year</th>
                                {group?.students[0]?.preference ? <th>Preference</th> : <th/>}
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {group?.students.map((student, index) => (
                                <tr key={index}>
                                  <td>{student?.email}</td>
                                  <td>{student?.name}</td>
                                  <td>{student?.degree}</td>
                                  <td>{student?.year}</td>
                                  {student?.preference ? <td>{student?.preference}</td> : <td/>}
                                  <td><FontAwesomeIcon icon={faPenToSquare} className="fa-1x" onClick={() => {
                                    setGroupDetails(group)
                                    setStudentDetails(student)
                                    setShowEditPopup(true)
                                  }} />
                                  </td>
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
                  <div>
                    <label>Group Size: </label>{" "}
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
                    <label> Students/ Group</label>
                  </div>
                  <br />
                  <div>
                    <label>Group Allocation Setting: </label>{" "}
                    <>
                      <select
                        value={groupAllocationSetting}
                        onChange={(event) =>
                          setGroupAllocationSetting(event.target.value)
                        }
                      >
                        <option>Automatic</option>
                        <option>Random Allocation</option>
                      </select>
                      {groupAllocationSetting == "Automatic" && (
                        <p style={{ marginTop: "20px" }}>
                          Sort By:{"  "}
                          <select
                            value={automaticAllocationSetting}
                            onChange={(event) =>
                              setAutomaticAllocationSetting(event.target.value)
                            }
                          >
                            <option>Student Topic Preferences</option>
                            <option>Similar Year Groups</option>
                            <option>Similar Degree Groups</option>
                            <option>Diverse Year Groups</option>
                            <option>Diverse Degree</option>
                          </select>
                        </p>
                      )}
                    </>
                  </div>
                </div>
              )}
            </Tab>
            <Tab
              eventKey="TopicsOverview"
              title="Topic List Overview"
              tabClassName={`${styles.bootstrapSingleTab}`}
            >
              <>
                {topics?.topicsReleased && topics.topicsData?.length > 0 ? (
                  <Table striped borderless hover>
                    <thead>
                      <tr>
                        <th>Topic</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topics.topicsData.map((topic, index) => {
                        return (
                          <tr key={index}>
                            <td>{topic}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <div className="bg-light p-5 d-flex flex-column align-items-center gap-3">
                    <h2 className="d-flex align-items-center justify-content-center">
                      You have not published a topic list yet.
                    </h2>
                    <Link
                      href={`/create-topic-preferences?tutorialId=${tutorialId}`}
                    >
                      <Button style={{ color: "#0D41D", width: "250px" }}>
                        Create Topic List
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            </Tab>
          </Tabs>
        </div>
      ) : (
        <Loading />
      )}
      <GroupEditPopup
        tutorialId={tutorialId}
        showPopup={showEditPopup}
        setShowPopup={setShowEditPopup}
        groups={groups}
        groupDetails={groupDetails}
        student={studentDetails}
      />
    </>
  );
};

export default AdminOverview;
