import React, { useState, useEffect } from "react";
import EnterBar from "./EnterBar";
import Todo from "./Todo";
import TodoGroup from "./TodoGroup";

function GroupsList({todoGroups,setTodoGroups}) {
  //  const [todoGroups, setTodoGroups] = useState([]);


    return (
        <div className={"left-sidebar"}>
            <h2> Todo Groups</h2>
            <ul>
                {todoGroups.map((todoGroup) => (
                    <TodoGroup  key={todoGroup.id} todoGroup={todoGroup}/>
                ))}
            </ul>
        </div>
    );
}


export default GroupsList;