import styles from "../styles/CreateTopic.module.css"
import connectMongo from "../util/mongodb";
import Tutorial from "../models/Tutorial";
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
export async function getServerSideProps({ query }) {

    console.log("QUERY")
    console.log(query.tutorialId == undefined)

    if (query.tutorialId != undefined) {
        const tutorialId = query.tutorialId
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');

        const result = await Tutorial.find({ tutorialId: tutorialId }).select('topics topicsReleased');
        console.log(result)
        const topics = Array.from(JSON.parse(JSON.stringify(result))[0]["topics"])
        const topicsReleased = JSON.parse(JSON.stringify(result))[0]["topicsReleased"]
        return {
            props: { current_topics: topics, released: topicsReleased, tutorialId: tutorialId }
        }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/admin-dashboard"
            }
        }
    }
}

function AddTopics({ current_topics, released, tutorialId }) {
    const [topics, setTopics] = useState(new Set(current_topics))
    const storedTopics = new Set(current_topics)
    const [potentialTopic, setTopic] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()

    const handleSave = async (event) => {


        const JSONdata = JSON.stringify(
            { "tutorialId": tutorialId, "topics": Array.from(topics) }
        )

        const endpoint = 'api/create-topics'
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSONdata
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        console.log(result)
        router.reload(window.location.pathname)
    }

    const handleRelease = async () => {

        const JSONdata = JSON.stringify(
            { "tutorialId": tutorialId }
        )

        const endpoint = 'api/release-topics'
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSONdata
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        router.reload(window.location.pathname)
    }

    const handleOnKeyDown = (event) => {
        if (event.key == 'Enter') {
            handleClick(event);
        }
    }

    const onChange = e => {
        if (errorMessage != "") { setErrorMessage("") }
        setTopic(e.target.value);
    }

    const handleClick = () => {

        if (potentialTopic != "") {
            if (topics.has(potentialTopic)) {
                setErrorMessage("Topic already added")
            } else {
                var temp = new Set(topics);
                temp.add(potentialTopic);
                setTopics(temp);
                setErrorMessage("");
            }
        }

    }

    const removeTopic = (event, topic) => {

        var temp = new Set(topics);
        temp.delete(topic);

        setTopics(temp);
    }

    const compareTopics = () => {
        if (storedTopics.size !== topics.size) {
            return false;
        }

        return Array.from(storedTopics).every(element => {
            return topics.has(element);
        });
    }

    const backButton = () => {
        return (
            <Button className={styles.primBtn}>
                <Link href="/admin-dashboard">
                    <span>Back to dashboard</span>
                </Link>
            </Button>
        )
    }

    return (
        <div className="p-5">
            <h2>Create and Publish a Topic List</h2>
            <div>
                <Table striped borderless>
                    <tbody>
                        {
                            topics.size > 0 ? (
                                Array.from(topics).map((topic, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    className={styles.deleteIcon}
                                                    disabled={released}
                                                    onClick={event => removeTopic(event, topic)}
                                                >
                                                    <FontAwesomeIcon icon={faMinus} className="fa-1x" />
                                                </Button>
                                                <span className="ms-3">{topic}</span>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : <tr><td>No Topics have been added yet!</td></tr>
                        }
                    </tbody>
                </Table>
            </div>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={handleOnKeyDown}
                className={`${styles.primInp} ${errorMessage === "" ? "" : styles.error}`}
            />
            <Button disabled={released} className={released ? styles.disablePrime : styles.primBtn} onClick={handleClick}>Add Topic</Button>
            <p className="text-danger">{errorMessage}</p>
            <div className="d-flex gap-3 my-3">
                <form onSubmit={handleSave}>
                    <Button disabled={topics.size == 0 || released} className={topics.size == 0 || released ? styles.disablePrime : styles.primBtn} type="submit"> Save Topics </Button>
                </form>

                <form onSubmit={handleRelease}>
                    <Button disabled={topics.size == 0 || released || !compareTopics()} className={topics.size == 0 || released || !compareTopics() ? styles.disablePrime : styles.primBtn} type="submit"> Release Topics </Button>
                </form>
            </div>
            {backButton()}
        </div>
    )
}

export default AddTopics;