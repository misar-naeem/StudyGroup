import StudentNavBar from "../components/StudentNavBar"
import { Button, Accordion, Col } from "react-bootstrap"
import Preference from "../models/Preference";
import Tutorial from "../models/Tutorial";
import styles from "../styles/Tutorial.module.css";
import { useEffect, useState } from "react";
import connectMongo from "../util/mongodb";
import PreferencePopup from "../components/PreferencePopup";

export async function getServerSideProps({ query }) {

    if (query.tutorialId != undefined) {
        const tutorialId = query.tutorialId
        const studentId = query.student;
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');


        var topics, topicsReleased = []
        var currentChoice = ""

        // Check if student already added in preference
        const res = await Preference.find({ tutorialId: tutorialId, studentId: studentId }).select("topic");

        currentChoice = JSON.parse(JSON.stringify(res))

        if (currentChoice.length == 0) {
            const result = await Tutorial.find({ tutorialId: tutorialId }).select('topics topicsReleased');
            topics = Array.from(JSON.parse(JSON.stringify(result))[0]["topics"])
            topicsReleased = JSON.parse(JSON.stringify(result))[0]["topicsReleased"]
            currentChoice = ""
        } else {
            currentChoice = JSON.parse(JSON.stringify(res))[0]["topic"]
            topics = []
            topicsReleased = []
        }
        return {
            props: { tutorialId: tutorialId, topics: topics, currentChoice: currentChoice, studentId: studentId}
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/student-dashboard"
            }
        }
    }
}


const tutorial = ({ tutorialId, topics, currentChoice, studentId }) => {
    const [groups, setGroups] = useState([])
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        if (currentChoice.length === 0) {
            setShowPopup(true);
        }
        else {
            setShowPopup(false);
        }
    }, [])
    return (
        <>
            <StudentNavBar />
            <div className={`${styles.tutorial} p-3`}>
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="p-3">
                        Tutorial {tutorialId[tutorialId.length - 1]}
                    </h1>
                    <label
                        className={
                            `${false
                                ? styles.primInCompbtn
                                : styles.primCompbtn} text-center`
                        }
                    >
                        {/* Allocation {getGroup(student.email).groupStatus} */}
                        Allocation
                    </label>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-5">
                    <span className={`${styles.subjectPreference}`}>Your Topic Preference: </span>
                    <span className={`${styles.preferenceName}`}>{currentChoice}</span>
                </div>
                <div className="groups">
                    {
                        groups && groups.length > 0 ? (<Accordion className={styles.Accordion}>
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
                                                    <tr key={student.email}>
                                                        <td>{student?.email}</td>
                                                        <td>{student?.name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>) : (
                            <div className={`${styles.noGroupContainer}`}>
                                <Col className={`${styles.noGroup}`}>You are not allocated to a group yet!</Col>
                            </div>
                        )
                    }
                </div>
            </div>
            <PreferencePopup
                showPopup={showPopup}
                topics={topics}
                size="lg"
                tutorialId={tutorialId}
                studentId = {studentId}
            />
        </>

    )
}

export default tutorial