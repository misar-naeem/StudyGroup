import React from "react";
import connectMongo from "../util/mongodb";
import Tutorial from "../models/Tutorial";
import Preference from "../models/Preference";
// import Group from "../models/Group";
import Button from 'react-bootstrap/Button';
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from 'next/router';
import StudentNavBar from "../components/StudentNavBar";
import styles from "../styles/Home.module.css";
import Modal from 'react-bootstrap/Modal';
import { Dropdown, DropdownButton } from "react-bootstrap";

export async function getServerSideProps({ query }) {

    const degrees = ["Computer Science", "Software Engineering", "Bachelor of Science and IT", "Bachelor of IT"]
    const years = [1, 2, 3]
    const tutorialId = query.tutorial;
    const studentId = query.student;
    const subject = query.subject;

    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    var topics, topicsReleased = []
    var currentChoice = ""
    var group = ""

    // Check if student already added in preference
    const res = await Preference.find({tutorialId: tutorialId, studentId: studentId}).select("topic");
    
    currentChoice = JSON.parse(JSON.stringify(res))
    if (currentChoice.length == 0) {
        const result = await Tutorial.find({tutorialId: tutorialId}).select('topics topicsReleased');
        topics = Array.from(JSON.parse(JSON.stringify(result))[0]["topics"])
        topicsReleased = JSON.parse(JSON.stringify(result))[0]["topicsReleased"]
        currentChoice = ""
    } else {
        currentChoice = JSON.parse(JSON.stringify(res))[0]["topic"]
        topics = []
        topicsReleased = []

        // Get current group
    }

    return {
        props: {
            currentChoice: currentChoice, 
            topics: topics, 
            degrees: degrees, 
            years: years, 
            tutorialId: tutorialId, 
            studentId: studentId, 
            topicsReleased: topicsReleased, 
            subject: subject, 
            group: group
        }
    }
}

export default function AddStudentInformation({
    topics, currentChoice, tutorialId, studentId, topicsReleased, subject, group
}) {

    const [topic, setTopic] = React.useState()
    const router = useRouter();

    const [show, setShow] = React.useState(false);

    const handleClose = () => {
        setTopic();
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleSubmit = async (event) => {
        setShow(false);
        const data = {tutorialId: tutorialId, studentId: studentId, topic: topic}
        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/add-preference'

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSONdata
        }
        
        const response = await fetch(endpoint, options)
        await response.json()

        router.reload(window.location.pathname)
    }

    const displayDropDown = (getOptions, name, onSelectHandler) => {
        return (
            <div>
                <DropdownButton onSelect={onSelectHandler} title={topic}>
                {getOptions.map((value,index)=>{
                        return (
                            <Dropdown.Item 
                                eventKey={value}
                            >
                                {value}
                            </Dropdown.Item>
                        )
                    })}
                </DropdownButton>
            </div> 
            )
    }

    const topicModal = ({subject, tutorialId}) => {
        return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{subject} - {tutorialId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Please select one stopic statement as your tutorial topic preference.</p>
        {displayDropDown(topics, "topic", setTopic)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit} disabled={!topic}>
            Confiirm Preferences
          </Button>
        </Modal.Footer>
      </Modal>
        )
    }

    const ModalButton = () => {
        if (currentChoice) {
            return (`Topic Preference - ${currentChoice}`)
        }
        return (
            <Button variant="primary" onClick={handleShow}>
                Select Topic Preference
            </Button>
        )
    }

    const GroupDisplay = () => {
        if (group) {
            return (group)
        } else {
            return (
                <h3>You are not allocated to a group yet!</h3>
            )
        }
    }

    if (topicsReleased) {
        return (
            <> 
            <StudentNavBar />
            {topicModal({subject, tutorialId})}
            <div className={styles.studentLayout}>
              <div className={`d-flex flex-column justify-content-center p-3 ps-5`}>
                <h1 className="p-3">
                  <span className={styles.span}>Tutorial</span>
                </h1>
                <div style={{ width: "400px" }}>
                    <p>{subject} {tutorialId}</p>
                    <p><ModalButton/></p>
                </div>
                <div>
                    <GroupDisplay/>
                </div>
              </div>
            </div>
            <button onClick={() => signOut()}>Sign out.</button>
          </>
        )
    } else {
        return(
            <> 
            <StudentNavBar />
            <div className={styles.studentLayout}>
              <div className={`d-flex flex-column justify-content-center p-3 ps-5`}>
                <h1 className="p-3">
                  <span className={styles.span}>Tutorial</span>
                </h1>
                <div style={{ width: "400px" }}>
                    <p>{subject} {tutorialId}</p>
                    <p style={{ fontWeight: "bold" }}>Topics not available for selection yet</p>
                </div>
              </div>
            </div>
            <button onClick={() => signOut()}>Sign out.</button>
          </>
        )
    }


}