import React, {useState} from "react";


const EnterBar = ({isPosted, setIsPosted}) => {
    const [taskName, setTaskName] = useState('');
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(taskName)
    }

    function AddTask() {
        if (!taskName.trim()) {
            //TODO make red border with text under
            alert("Task can't be empty")
            return;
        }
        fetch("/todo", requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add task");
            }
        })
            .then(() => setIsPosted(true)).then(() => setTaskName(""))
            .catch(error => console.log(error));
    }


    const handleChange = event => {
        setTaskName(event.target.value);
    }

    return (
        <form>
            <input type={"text"} className="todo-input" onChange={handleChange} value={taskName}/>
            <button onClick={AddTask} type={"button"} className={"post-button"}>
                Post
            </button>
        </form>
    )
}
export default EnterBar;