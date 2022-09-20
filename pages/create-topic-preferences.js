import React from "react";
import connectMongo from "../util/mongodb";
import Tutorial from "../models/Tutorial";
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from "next/link";

export async function getServerSideProps({ query }) {

    console.log("QUERY")
    console.log(query.tutorialId == undefined)

    if (query.tutorialId != undefined) {
        const tutorialId = query.tutorialId
        console.log('CONNECTING TO MONGO');
        await connectMongo();
        console.log('CONNECTED TO MONGO');
    
        const result = await Tutorial.find({tutorialId: tutorialId}).select('topics topicsReleased');
        console.log(result)
        const topics = Array.from(JSON.parse(JSON.stringify(result))[0]["topics"])
        const topicsReleased = JSON.parse(JSON.stringify(result))[0]["topicsReleased"]
        return {
            props: {current_topics: topics, released: topicsReleased}
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

function AddTopics({current_topics, released}) {
    const [topics, setTopics] = React.useState(new Set(current_topics))
    const storedTopics = new Set(current_topics)
    const [potentialTopic, setTopic] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")
    const router = useRouter()

    const handleSave = async (event) => {


        const JSONdata = JSON.stringify(
            {"tutorialId": "tut1", "topics": Array.from(topics)}
        )

        const endpoint = 'api/create-topics'
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSONdata
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        console.log(result)
        router.reload(window.location.pathname)
    }

    const handleRelease = async () => {

        const JSONdata = JSON.stringify(
            {"tutorialId": "tut1"}
        )

        const endpoint = 'api/release-topics'
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSONdata
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        console.log(result)
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

    const topicDisplay = (topic) => {
        return (
            <div>
                <button disabled={released} onClick={event => removeTopic(event, topic)}> x </button>
                <span>{topic}</span>
            </div>
            )
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
        <Button>
            <Link href="/admin-dashboard">
              <p>Back to dashboard</p>
            </Link>
        </Button>
        )
    }

    return (
    <div>

        <h2>Add Topic Preferences</h2>
        <div>Add Topic Preferences here</div>

        <input 
            type="text" 
            onChange={onChange} 
            onKeyDown={handleOnKeyDown}
        />
        <button disabled={released} onClick={handleClick}>Add Topic</button>

        <form onSubmit={handleSave}>
            <button disabled={topics.size == 0 || released} type="submit"> Save Topics </button>
        </form>

        <form onSubmit={handleRelease}>
            <button disabled={topics.size == 0 || released || !compareTopics()} type="submit"> Release Topics </button>
        </form>

        <p>{errorMessage}</p>

        <div>
            {
                Array.from(topics).map((topic,index)=>{
                    return topicDisplay(topic)
                })
            }
        </div>
        {backButton()}
    </div>
    )
}

export default AddTopics;