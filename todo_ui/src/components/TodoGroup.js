import React, {useState, useEffect} from "react";
import {HiOutlineTrash, HiCheck, HiX} from "react-icons/hi";
import {IoMdAdd} from "react-icons/io";

function TodoGroup({todoGroup, setTodoGroups, setAddingToGroupProvider, todosInGroup , setTodosInGroupForShow}) {
    const [isAddingToGroup, setIsAddingToGroup] = useState(false);

    function deleteTask() {
        const requestOptions = {
            method: "DELETE", headers: {"Content-Type": "application/json"}
        };
        fetch(`/group/${todoGroup.id}`, requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
        }).then(() => setTodoGroups(prev => prev.filter(el => el.id !== todoGroup.id)))
    }
    const FetchTodosInGroup = () => {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"}
        };
        fetch(`/group/todosInGroup/${todoGroup.id}`,requestOptions).then((response) => {
            if(!response.ok) {
                throw new Error("Failed to get Todos in Group");
            }
        }).then(setTodosInGroupForShow(response))
    }

    const addTodoToGroupHandler = () => {
        const currentIsAddingToGroup = !isAddingToGroup;
        setIsAddingToGroup(currentIsAddingToGroup);
        setAddingToGroupProvider(currentIsAddingToGroup);
    }

    const setCheckedTodos = () => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({todosInGroup})
        }
        console.log(todosInGroup)
        console.log(requestOptions)
        fetch(`/group/${todoGroup.id}`, requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to put todos to group")
            }
        })

    }

    return (
        <div className={"todo-group"}>
            <div className={'todo-group-text'}>
                {todoGroup.name}
            </div>

            {isAddingToGroup ? <div><HiCheck onClick={setCheckedTodos}/> <HiX onClick={addTodoToGroupHandler}/></div> :
                <div className={"add-todo-to-group-button"}>
                    <IoMdAdd onClick={addTodoToGroupHandler}/>
                </div>}

            <div className={"delete-group-button"}>
                <HiOutlineTrash size={"20"} color={"red"} onClick={deleteTask}/>
            </div>

        </div>
    )

}

export default TodoGroup;