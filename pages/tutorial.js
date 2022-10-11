import StudentNavBar from "../components/StudentNavBar"
import { Button, Accordion, Col } from "react-bootstrap"
import styles from "../styles/Tutorial.module.css";
import { useState } from "react";

export async function getServerSideProps({ query }) {

    console.log("QUERY")
    console.log(query.tutorialId == undefined)

    if (query.tutorialId != undefined) {
        const tutorialId = query.tutorialId
        // console.log('CONNECTING TO MONGO');
        // await connectMongo();
        // console.log('CONNECTED TO MONGO');

        // const result = await Tutorial.find({ tutorialId: tutorialId }).select('topics topicsReleased');
        // console.log(result)
        // const topics = Array.from(JSON.parse(JSON.stringify(result))[0]["topics"])
        // const topicsReleased = JSON.parse(JSON.stringify(result))[0]["topicsReleased"]
        return {
            props: { tutorialId: tutorialId }
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


const tutorial = ({ tutorialId }) => {
    const [groups, setGroups] = useState([])
    return (
        <>
            <StudentNavBar />
            <div className={`${styles.tutorial} p-3`}>
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className="p-3">
                        Tutorial
                    </h1>
                    <Button
                        className={
                            true
                                ? styles.primInCompbtn
                                : styles.primCompbtn
                        }
                    >
                        {/* Allocation {getGroup(student.email).groupStatus} */}
                        Allocation
                    </Button>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-5">
                    <span className={`${styles.subjectPreference}`}>Your Subject Topic Preference:</span>
                    <span className={`${styles.preferenceName}`}>Student’s subject preference here</span>
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
        </>
    )
}

export default tutorial