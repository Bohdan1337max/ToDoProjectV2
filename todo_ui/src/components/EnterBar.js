import React, {Component, useState} from "react";


const EnterBar = ({isPosted,setIsPosted}) => {
    const [message, setMessage] = useState('');
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(message)
    }
    function AddTask() {
        fetch("/TodoController",requestOptions)
            .then(() =>setIsPosted(true))
            .catch(error => console.error(error));
        console.log(isPosted)
    }


    const handleChange = event => {
        setMessage(event.target.value);
    }

    return (
        <form>
            <input type={"text"} className="todo-input" onChange={handleChange} value={message}/>
            <button onClick={AddTask} type={"button"} className={"post-button"}>
                Post
            </button>
        </form>
    )
}
export default EnterBar;