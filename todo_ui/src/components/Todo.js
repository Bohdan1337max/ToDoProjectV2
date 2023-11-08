import React, {useEffect, useState} from "react";
import {HiOutlineTrash} from "react-icons/hi";

    function Todo({todo, setTodos, addingToGroupProvider, todosInGroup, setTodosInGroup}) {



    const [isEdited, setIsEdited] = useState(false);
    const [checked, setChecked] = useState(false);
    const [updatedName, setUpdatedName] = useState(todo.name);
    const [isCompleted, setIsCompleted] = useState(todo.completed);

    function deleteTask() {
        const requestOptions = {
            method: "DELETE", headers: {"Content-Type": "application/json"}
        };

        fetch(`api/todo/${todo.id}`, requestOptions).then((response) => {
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

        fetch(`api/todo`, requestOptions)
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
        fetch(`api/todo`, requestOptions).then((response) => {
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
    }

    const editButtonLabel = isEdited ? "Save" : "Edit";

    const editButtonHandle = () => {
        if (isEdited) {
            updateTask();
            setTodos((prev) => prev.map((el) => el.id === todo.id ? {...el, name: updatedName} : el));
        }
        setIsEdited(!isEdited);
    };

    const checkBoxChangeHandle = () => {
        const currentCheckBoxValue = !todo.checked;

        if (currentCheckBoxValue) {
            addToGroup()
        } else {
            removeFromGroup()
        }
        setChecked(currentCheckBoxValue)
    }


/*    const removeFromGroup = () => {
        const updatedTodosInGroup = todosInGroup.filter((id) => id !== todo.id);
        console.log(updatedTodosInGroup)
        setTodosInGroup(updatedTodosInGroup);
    };*/
        const removeFromGroup = () => {
            todo.checked = false;
            todo.todoGroupId = null;
        };

/*    const addToGroup = () => {
        if (todosInGroup.includes(todo.id)) {
            console.error(`Todo with ID ${todo.id} is already in the group.`);
            return;
        }
        const updatedTodosInGroup = [...todosInGroup, todo.id];
        setTodosInGroup(updatedTodosInGroup);
        console.log(todosInGroup)
    }
    */

        const addToGroup = () => {
            todo.checked = true
        }


        useEffect(() => {
            if(addingToGroupProvider)
                setChecked(todo.checked)
        }, [addingToGroupProvider]);

    return (<div className={`post ${isCompleted ? "completed" : ""}`}>
        {isEdited ?
            <textarea className={"edit-input"} type={"text"} defaultValue={todo.name} onChange={handleChange}/> :
            <div className={"task-text"}>{todo.name}  {todo.todoGroupId}</div>}
        <div className={"edit-buttons"} role={"group"}>
            <div> {addingToGroupProvider ?
                <input type={"checkbox"} checked={checked} onChange={checkBoxChangeHandle}/> : ""}</div>

            <button className={"edit-button"} onClick={editButtonHandle}>{editButtonLabel}</button>
            <div className={"complete-button"}
                 onClick={completeTask}>{isCompleted ? "Uncomplete" : "Complete"}</div>

            <div className={"delete-img"} onClick={deleteTask}>
                <HiOutlineTrash size={"30"} color={"red"}/>
            </div>
        </div>
    </div>);
}

export default Todo;