import React, {useState, useEffect} from "react";
import {HiOutlineTrash, HiCheck, HiX} from "react-icons/hi";
import {IoMdAdd} from "react-icons/io";
import Todo from "./Todo";

function TodoGroup({todoGroup, setTodoGroups, isAddedToGroup, setIsAddedToGroup}) {

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

    const addTodoToGroupHandler = () => {
        setIsAddedToGroup(!isAddedToGroup);
    }

    const setCheckedTodos = () => {

    }

    return (
        <div className={"todo-group"}>
            <div className={'todo-group-text'}>
                {todoGroup.name}
            </div>

            {isAddedToGroup ? <div><HiCheck onClick={setCheckedTodos}/> <HiX onClick={addTodoToGroupHandler}/></div> :
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