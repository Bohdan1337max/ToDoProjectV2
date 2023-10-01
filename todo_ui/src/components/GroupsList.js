import React, { useState, useEffect } from "react";
import EnterBar from "./EnterBar";
import Todo from "./Todo";
import {IoMdAdd} from "react-icons/io";
import TodoGroup from "./TodoGroup";

function GroupsList({todoGroups,setTodoGroups}) {
  //  const [todoGroups, setTodoGroups] = useState([]);


    return (
        <div className={"left-sidebar"}>
            <div> <IoMdAdd className={"create-group-button"}/> </div>
            <h2> Todo Groups</h2>

            <ul>
                {todoGroups.map((todoGroup) => (
                    <TodoGroup  key={todoGroup.id} todoGroup={todoGroup} setTodoGroups={setTodoGroups}/>
                ))}
            </ul>
        </div>
    );
}


export default GroupsList;