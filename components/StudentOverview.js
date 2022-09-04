import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import styles from "../styles/StudentOverview.module.css";

const StudentOverview = () => {
  return (
    <Tabs
    defaultActiveKey="StudentsOverview"
    transition={false}
    className={`${styles.bootstrapTabContainer} mb-3`}
  >
    <Tab eventKey="StudentsOverview" title="Students Overview" tabClassName={`${styles.bootstrapSingleTab}`}>
      <div className={`${styles.bootstrapTabContent}`}>
      <Table  bordered className={`${styles.bootstrapTable}`} striped hover>
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
          <td><Button className={styles.primCompbtn}>Allocation Complete</Button></td>
        </tr>
        <tr>
          <td>Student Name</td>
          <td>Group 2</td>
          <td><Button className={styles.primInCompbtn}>Allocation Incomplete</Button></td>
        </tr>
        <tr>
          <td>Student Name</td>
          <td>Group 3</td>
          <td><Button className={styles.primCompbtn}>Allocation Complete</Button></td>
        </tr>
      </tbody>
    </Table> 
      </div>
    </Tab>
    <Tab eventKey="GroupOverview" title="Group Overview" tabClassName={`${styles.bootstrapSingleTab}`}>
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
          <td><Button>Manual Allocation</Button></td>
          <td>03 Students</td>
          <td>05 Students</td>
        </tr>
      </tbody>
    </Table>
        </div>
    </Tab>
  </Tabs>
  )
}

export default StudentOverview;
