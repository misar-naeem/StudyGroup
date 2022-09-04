import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import styles from "../styles/StudentOverview.module.css";

const StudentOverview = () => {
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
      </Tab>
    </Tabs>
  );
};

export default StudentOverview;
