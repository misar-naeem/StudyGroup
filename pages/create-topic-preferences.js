import React from "react";

function AddTopics({}) {

    const [topics, setTopics] = React.useState(new Set())
    const [potentialTopic, setTopic] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")

    const handleSubmit = async () => {

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
                <button onClick={event => removeTopic(event, topic)}> x </button>
                <span>{topic}</span>
            </div>
            )
    }

    const removeTopic = (event, topic) => {
        
        var temp = new Set(topics);
        temp.delete(topic);

        setTopics(temp);
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
        <button onClick={handleClick}>Add Topic</button>

        <form onSubmit={handleSubmit}>
            <button disabled={topics.size == 0} type="submit"> Save Topics </button>
        </form>

        <p>{errorMessage}</p>

        <div>
            {
                Array.from(topics).map((topic,index)=>{
                    return topicDisplay(topic)
                })
            }
        </div>
    </div>
    )
}

export default AddTopics;