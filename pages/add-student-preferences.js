import React from "react";
import connectMongo from "../util/mongodb";
import Tutorial from "../models/Tutorial";
import Preference from "../models/Preference";
import Button from 'react-bootstrap/Button';
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from 'next/router';

export async function getServerSideProps({ query }) {

    const degrees = ["Computer Science", "Software Engineering", "Bachelor of Science and IT", "Bachelor of IT"]
    const years = [1, 2, 3]
    const tutorialId = query.tutorial;
    const studentId = query.student;

    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    var topics, topicsReleased = []
    var currentChoice = ""

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
    }

    return {
        props: {currentChoice: currentChoice, topics: topics, degrees: degrees, years: years, tutorialId: tutorialId, studentId: studentId, topicsReleased: topicsReleased}
    }
}

export default function AddStudentInformation({topics, currentChoice, tutorialId, studentId, topicsReleased}) {

    const [topic, setTopic] = React.useState()
    const router = useRouter();

    const handleSubmit = async (event) => {
        
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

    const displayRadioGroup = (getOptions, name, onClickHandler) => {
        return (
            <div>
                {getOptions.map((value,index)=>{
                        return (
                            <div>
                                <input 
                                    type="radio" 
                                    value={value} 
                                    name={name} 
                                    onClick={() => onClickHandler(value)}
                                /> 
                                {value == 3 ? "3+" : value}
                            </div>
                        )
                    })}
            </div> 
            )
    }

    const backButton = () => {
        return (
        <Button>
            <Link href="/student-dashboard">
              <p>Back to dashboard</p>
            </Link>
        </Button>
        )
    }

    if (topicsReleased) {
        return (
            <div>
            <form onSubmit={handleSubmit}>
            <p/>
            <label htmlFor="topic">Topic Preference</label>
            {displayRadioGroup(topics, "topic", setTopic)}
            {currentChoice ? currentChoice : ""}
            {
                currentChoice ? "" :
                <button 
                    type="submit"
                    disabled={!topic}
                >
                    Submit
                </button>
            }

          </form>
          {backButton()}
          </div>
        )
    } else {
        return(
            <div>
                <h2>Topics are not available for selection yet!</h2>
                {backButton()}
            </div>
        )
    }


}