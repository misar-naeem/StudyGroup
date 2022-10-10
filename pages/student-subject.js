
import { signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from 'react-bootstrap/Table';
import ListGroup from "react-bootstrap/ListGroup";
import styles from "../styles/StudentSubject.module.css";
import { Loading } from "../components/Loading";
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';


// const TutorialLink = ({ tutorial }) => {
//   return (
//     <Button>
//       <Link href="/add-student-preferences">
//         <p>{tutorial}</p> 
//       </Link>
//     </Button>
//   );
// };


export default function StudentSubject() {
  const [studentDetails, setStudentDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession();

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const topicPreference = [
    { label: "Software engineering", value: 1 },
    { label: "Software Design Studio", value: 2 },
    { label: "Data Structure", value: 3 },
    { label: "Machanical Engineering", value: 4 },
    { label: "Civil Eng", value: 5 },
    { label: "Nursing", value: 6 },
  ];


  // const getStudentByEmail = async (email) => {
  //   fetch(`/api/get-student/${email}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setStudentDetails(data["result"][0]);
  //     });
  // };

  //   useEffect(() => {
  //   if (session) {
  //     setLoading(true);
  //     getStudentByEmail(session.user.email);
  //     setLoading(false);
  //   }
  //   // else{
  //   //   router.push('/student-login')
  //   // }
  // }, []);

  return (
    <>
  <Button variant="primary" onClick={handleShow}>
    Select topic preference
  </Button>

  <Modal show={show} onHide={handleClose} centered>
  <Modal.Header  >
    <Modal.Title style={{marginLeft: 190}} id="contained-modal-title-vcenter" >
      Tutorial
    </Modal.Title>
  </Modal.Header>
  <Modal.Body >
    <div style={{margin: 20}}> 
      <p  class="text-center">
      Please select one topic statement as your subject topic preference.
    </p>
    </div>

    <div style={{width: 1300, marginRight: 10}} class="text-center">
    <div className="container" >
    <div className="row" >
      <div style={{justifyContent: "center", width: 1000}}className="col-md-4"></div>
      <div style={{justifyContent: "center", marginLeft: 20}} className="col-md-4">
        <Select options={ topicPreference } />
      </div>
      <div className="col-md-4"></div>
    </div>
    </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <div class="col-md-12 text-center">  
  <Button variant="primary" onClick={handleClose}> 
  Confirm Preference
  </Button>
  </div>
  </Modal.Footer>
</Modal>
    {
      studentDetails !==  0 && !loading ? (
        <div>
           
      <div className="d-flex align-items-center">
      <div>
        <h1 style={{ width: "100%", display: "flex", margin: "40px" }}>
          Tutorial
        </h1>
        <p5 style={{ width: "100%", display: "flex", marginLeft: 40 }}>
        Your Subject Topic Preference:
      </p5>
      </div>
        <div className="col-5">
          <Form
            className="mr-sm"
            style={{ width: "100%", marginTop: 50, marginLeft: 600 }}
          >
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
              <Form.Label column sm="2">
              <Button className={styles.allocationButton} style={{ width: "220px", marginTop: 50}} variant="warning">Incomplete Allocation</Button>{' '}
              </Form.Label>
              
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextStudyYear"
            >
              <Form.Label column sm="6">
                Student's subject preference here <span style={{ width: "200px", fontWeight: "bold" }}> </span>
              </Form.Label>
              <Col sm="10">
                
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
     
      <div style={{ width: "1500px", display: "flex", marginLeft: 30}}  >
        <ListGroup className={styles.listgroup} horizontal >
          <ListGroup.Item
            className="col-xs-3 list-group-item"
            style={{ width: "1500px" }}
          >
            Group #
          </ListGroup.Item>
          <ListGroup.Item
            className="col-xs-3 list-group-item"
            style={{ width: "1000px" }}
          >
            04/05 Students
          </ListGroup.Item>
        </ListGroup>
      </div>
     
<Table style={{  marginLeft: 33 }} className={styles.groupstudentlist} striped borderless hover size="sm">
    
      <tbody>
        <tr>
          <td colSpan={2}>Student Name</td>
          <td>Student Email</td>
        </tr>
        <tr>
          <td colSpan={2}>Student Name</td>
          <td>Student Email</td>
        </tr>
        <tr>
          <td colSpan={2}>Student Name</td>
          <td>Student Email</td>
        </tr>
        <tr>
          <td colSpan={2}>Student Name</td>
          <td>Student Email</td>
        </tr>
        <tr>
          <td colSpan={2}>Student Name</td>
          <td>Student Email</td>
        </tr>
        
      </tbody>
    </Table>

    </div>):(<Loading />)
    }
      
    </>
  );
}
