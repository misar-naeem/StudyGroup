import React from "react";
import connectMongo from "../util/mongodb";
import Tutorial from "../models/Tutorial";
import Button from 'react-bootstrap/Button';
import Link from "next/link";

export async function getServerSideProps({ query }) {

    console.log(query)

    const degrees = ["Computer Science", "Software Engineering", "Bachelor of Science and IT", "Bachelor of IT"]
    const years = [1, 2, 3]
    const tutorialId = query.tutorial;
    const studentId = query.student;

    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    const result = await Tutorial.find({tutorialId: tutorialId}).select('topics topicsReleased');
    const topics = Array.from(JSON.parse(JSON.stringify(result))[0]["topics"])
    const topicsReleased = JSON.parse(JSON.stringify(result))[0]["topicsReleased"]

    return {
        props: {topics: topics, degrees: degrees, years: years, tutorialId: tutorialId, studentId: studentId, topicsReleased: topicsReleased}
    }
}

export default function AddStudentInformation({topics, degrees, years, tutorialId, studentId, topicsReleased}) {

    const [topic, setTopic] = React.useState()
    const [degree, setDegree] = React.useState()
    const [year, setYear] = React.useState()

    const handleSubmit = async (event) => {
        
        const data = {tutorialId: tutorialId, studentId: studentId, topic: topic, degree: degree, year: year}
        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/add-preference'

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSONdata
        }
        
        const response = await fetch(endpoint, options)
        await response.json()
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
            <p/>
            <label htmlFor="degree">Degree</label>
            {displayRadioGroup(degrees, "degree", setDegree)}
            <p/>
            <label htmlFor="year">Year</label>
            {displayRadioGroup(years, "year", setYear)}
            <p/>
            <button 
                type="submit"
                disabled={!topic || !degree || !year}
            >
                Submit
            </button>
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