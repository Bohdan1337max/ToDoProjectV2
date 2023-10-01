import React, {useState, useEffect} from "react";
import {HiOutlineTrash} from "react-icons/hi";

function TodoGroup({todoGroup,setTodoGroups}) {

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

    return (<li className={"todo-group"}>
            <div className={'todo-group-text'}>
                {todoGroup.name}
            </div>
            <div className={"delete-group-button"}><HiOutlineTrash size={"20"} color={"red"}/></div>
        </li>
    )
}

export default TodoGroup;