import { Button, Col, Modal } from "react-bootstrap"
import { useState } from "react"
import styles from "../styles/StudentPopup.module.css";
import { useRouter } from "next/router";
const PreferencePopup = ({ showPopup, topics, size, tutorialId, studentId }) => {

    const [preference, setPreference] = useState("")
    const router = useRouter();
    const handleSubmit = async () => {
        if (preference.length > 0) {
            const data = { tutorialId: tutorialId, studentId: studentId, topic: preference }
            const JSONdata = JSON.stringify(data)
            const endpoint = '/api/add-preference'

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSONdata
            }

            const response = await fetch(endpoint, options)
            await response.json()

            router.reload(window.location.pathname)
        }
        else {
            alert("Must select a select preference")
        }
    }
    return (
        <Modal show={showPopup} centered size={size}>
            <Modal.Body className="d-flex flex-column p-5 align-items-center gap-5" style={{ backgroundColor: "#e5e5e5", borderRadius: "10px" }}>
                <h2>Tutorial {tutorialId[tutorialId.length - 1]}</h2>
                <Col xs={7}>Please select one topic statement as your subject topic
                    preference.</Col>
                <select
                    className={`${styles.studentSelect} p-2`}
                    onChange={(event) => setPreference(event.target.value)}
                >
                    <option value="">Select</option>
                    {topics.map((topic, index) => (
                        <option key={index} value={topic}>
                            {topic}
                        </option>
                    ))}
                </select>
                <Button onClick={handleSubmit}>Confirm Preference</Button>
            </Modal.Body>
        </Modal>
    )
}

export default PreferencePopup