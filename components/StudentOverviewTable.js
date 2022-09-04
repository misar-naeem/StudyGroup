import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import styles from "../styles/StudentOverview.module.css";
const StudentOverviewTable = () => {
  return (
    <Table striped bordered hover>
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
          <td><Button className={styles.primInCompbtn}>Allocation Complete</Button></td>
        </tr>
        <tr>
          <td>Student Name</td>
          <td>Group 3</td>
          <td><Button className={styles.primCompbtn}>Allocation Complete</Button></td>
        </tr>
      </tbody>
    </Table> 
  )
}

export default StudentOverviewTable