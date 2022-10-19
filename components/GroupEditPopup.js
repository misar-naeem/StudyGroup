import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react';
import { useRouter } from "next/router";
import styles from "../styles/StudentPopup.module.css";
const GroupEditPopup = ({ student, groupDetails, tutorialId, showPopup, setShowPopup, groups }) => {

    const [newGroup, setNewGroup] = useState(0);
    const router = useRouter();
    const handleSubmit = async () => {
        const data = { tutorialId: tutorialId, student: student, newGroup: newGroup, oldGroup: groupDetails.groupNumber }
        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/edit-group'
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSONdata
        }

        const response = await fetch(endpoint, options);
        const result = await response.json();
        setShowPopup(false);
        router.reload(window.location.pathname);
    }
    return (
        <Modal show={showPopup} centered size="lg">
            <Modal.Header><h2>Change {(student?.email.split(".")[0])}'s Group</h2></Modal.Header>
            <Modal.Body className='d-flex flex-column gap-3'>
                <div className={`${styles.studentBody} d-flex align-items-center justify-content-between p-5`}>
                    <label>From: Group {groupDetails.groupNumber}</label>
                    <div>
                        <label className='me-2'>To: </label>
                        <select
                            className={`${styles.studentSelect} p-2`}
                            onChange={(event) => setNewGroup(event.target.value)}
                        >
                            <option value="">Select</option>
                            {groups.map((g, index) => (
                                (groupDetails.groupNumber !== g.groupNumber && <option key={index} value={g.groupNumber}>
                                    {g.groupNumber}
                                </option>)
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <Button onClick={handleSubmit} className={`${styles.mainBtn} p-2`}>Save and Apply Changes</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default GroupEditPopup