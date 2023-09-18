import React, {useState} from "react";
import { MdDeleteForever } from "react-icons/md";

function Todo({ todo, setTodos,todos }) {
    const [isEdited, setIsEdited] = useState(false);
    const [message, setMessage] = useState(todo.name);

    function deleteTask() {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo.id)
        };

        fetch("/TodoController", requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
        }).then(() =>setTodos(prev => prev.filter(el => el.id !== todo.id)))
    }

    function updateTask() {
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...todo, name: message }),
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

    const handleChange = event => {
        setMessage(event.target.value);
    }
    const editButtonLabel = isEdited ? "Save" : "Edit";

    const editButtonHandle = () => {
        if (isEdited) {
            updateTask();
            setTodos((prev) =>
                prev.map((el) =>
                    el.id === todo.id ? { ...el, name: message } : el
                )
            );
        }
        setIsEdited(!isEdited);

    };

    return (
        <div className={"post"}>
            {isEdited
            ?<input type={"text"} onChange={handleChange} />:
                <h2>{todo.name}</h2>}
            <div className={"edit-buttons"} role={"group"}>
                <button className={"edit-button"} onClick={editButtonHandle}>{editButtonLabel}</button>
                <div className={"button-2"} >Complete</div>
                <div className={"delete-img"} onClick={deleteTask}>
                    <MdDeleteForever size={"30"} color={"red"} />
                </div>
            </div>
        </div>
    );
}

export default Todo;