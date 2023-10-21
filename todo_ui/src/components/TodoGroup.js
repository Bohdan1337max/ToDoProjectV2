import React, {useState, useEffect} from "react";
import {HiOutlineTrash, HiCheck, HiX} from "react-icons/hi";
import {IoMdAdd} from "react-icons/io";

function TodoGroup({
                       todoGroup,
                       setTodoGroups,
                       setAddingToGroupProvider,
                       todosInGroup,
                       setTodosInGroupForShow,
                       isGroupShowing,
                       setIsGroupShowing
                   }) {

    const [isAddingToGroup, setIsAddingToGroup] = useState(false);

    function deleteTask() {
        const requestOptions = {
            method: "DELETE", headers: {"Content-Type": "application/json"}
        };
        fetch(`/group/${todoGroup.id}`, requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete task group");
            }
        }).then(() => setTodoGroups(prev => prev.filter(el => el.id !== todoGroup.id)))
    }

    const FetchTodosInGroup = () => {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"}
        };
        fetch(`/group/todosInGroup/${todoGroup.id}`, requestOptions).then((res) => res.json()).then(
            (result) => {
                setTodosInGroupForShow(result);
            }
        ).then(isGroupShowing? " ": setIsGroupShowing(true))
        console.log(isGroupShowing)
    }


    const canselAddingToGroup = () => {
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

        fetch(`/group/${todoGroup.id}`, requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to put todos to group")
            }
        }).then(canselAddingToGroup)

    }

    return (
        <div className={"todo-group"}>
            <div className={'todo-group-text'} onClick={FetchTodosInGroup}>
                {todoGroup.name}

            </div>

            {isAddingToGroup ? <div><HiCheck onClick={setCheckedTodos}/> <HiX onClick={canselAddingToGroup}/></div> :
                <div className={"add-todo-to-group-button"}>
                    <IoMdAdd onClick={canselAddingToGroup}/>
                </div>}

            <div className={"delete-group-button"}>
                <HiOutlineTrash size={"20"} color={"red"} onClick={deleteTask}/>
            </div>

        </div>
    )

}

export default TodoGroup;