import React, {useState, useEffect} from "react";
import {VscEdit} from "react-icons/vsc";
import {IoMdAdd} from "react-icons/io";
import TodoGroup from "./TodoGroup";

function GroupsList({
                        setError, setAddingToGroupProvider,  setTodosInGroupForShow, isGroupShowing,
                        setIsGroupShowing ,onTodoAdded, todos
                    }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isGroupNameEnter, setIsGroupNameEnter] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [todoGroups, setTodoGroups] = useState([]);
    const [isGroupChanged, setIsGroupChanged] = useState(false);

    const FetchTodoGroups = () => {
        fetch("/group").then((res) => res.json()).then(
            (result) => {
                setIsLoaded(true);
                setTodoGroups(result);
            },
            (error) => {
                setIsLoaded(false);
                setError(error);
            }
        )
    }

    useEffect(() => {
        FetchTodoGroups();
    }, []);


    useEffect(() => {
        if (isGroupChanged) {
            FetchTodoGroups();
            setIsGroupChanged(false)
        }
    }, [isGroupChanged]);

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(groupName)
    }

    function openEnterBar() {
        setIsGroupNameEnter(!isGroupNameEnter)
    }

    const saveButtonHandler = () => {
        if (!groupName.trim()) {
            alert("Task can't be empty")
            return;
        }
        fetch("/group", requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add task");
            }
        })
            .then(() => setIsGroupChanged(true)).then(() => setGroupName("")).then(() => setIsGroupNameEnter(!isGroupNameEnter))
            .catch(error => console.log(error));
    }

    const handleChange = event => {
        setGroupName(event.target.value)
    }


    return (
        <div className={"left-sidebar"}>
            <IoMdAdd size={20} className={`add-group-button ${isGroupNameEnter ? "visible" : ""}`} onClick={saveButtonHandler}/>
            <input type={"text"} className={`group-enter-bar ${isGroupNameEnter ? "visible" : ""}`} onChange={handleChange}
                   value={groupName}/>
            <VscEdit className={"open-enter-bar-group-button"} size={20} onClick={openEnterBar}/>
            <h2> Todo Groups</h2>
            <li>
                {todoGroups.map((todoGroup) => (
                    <TodoGroup key={todoGroup.id} todoGroup={todoGroup} setTodoGroups={setTodoGroups}
                               todos = {todos}
                               setAddingToGroupProvider={setAddingToGroupProvider}
                               setTodosInGroupForShow={setTodosInGroupForShow}
                               setIsGroupShowing={setIsGroupShowing}
                               isGroupShowing={isGroupShowing}
                               setIsGroupChanged = {setIsGroupChanged}
                               onTodoAdded= {onTodoAdded} // or changed

                    />
                ))}
            </li>
        </div>
    );
}


export default GroupsList;