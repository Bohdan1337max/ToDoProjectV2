import React, {useState} from "react";
import {MdDeleteForever} from "react-icons/md";

function Todo({todo, setTodos}) {
    const [isEdited, setIsEdited] = useState(false);
    const [updatedName, setUpdatedName] = useState(todo.name);
    const [isCompleted, setIsCompleted] = useState(todo.completed);

    function deleteTask() {
        const requestOptions = {
            method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify(todo.id)
        };

        fetch("/TodoController", requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
        }).then(() => setTodos(prev => prev.filter(el => el.id !== todo.id)))
    }

    function updateTask() {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...todo, name: updatedName}),
        };

        fetch(`/TodoController`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update task");
                }
                return response.json();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const completeTask = () => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({...todo, completed: !isCompleted}),
        };
        fetch(`/TodoController`, requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update task");
            }
            return setIsCompleted(!isCompleted);
        })
            .catch((error) => {
                console.error(error);
            });


    }
    const handleChange = event => {
        setUpdatedName(event.target.value);
        console.log(updatedName)
    }

    const editButtonLabel = isEdited ? "Save" : "Edit";

    const editButtonHandle = () => {
        if (isEdited) {
            updateTask();
            setTodos((prev) => prev.map((el) => el.id === todo.id ? {...el, name: updatedName} : el));
        }
        setIsEdited(!isEdited);
    };


    return (<div className={`post ${isCompleted ? "completed" : ""}`}>
        {isEdited ?
            <textarea className={"edit-input"} type={"text"} defaultValue={todo.name} onChange={handleChange}/> :
            <div className={"task-text"}>{todo.name}</div>}
        <div className={"edit-buttons"} role={"group"}>
            <button className={"edit-button"} onClick={editButtonHandle}>{editButtonLabel}</button>
            <div className={"complete-button"}
                 onClick={completeTask}>{isCompleted ? "Uncomplete" : "Complete"}</div>
            <div className={"delete-img"} onClick={deleteTask}>
                <MdDeleteForever size={"30"} color={"red"}/>
            </div>
        </div>
    </div>);
}

export default Todo;