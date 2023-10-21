import React, {useState, useEffect} from "react";
import {VscEdit} from "react-icons/vsc";
import {IoMdAdd} from "react-icons/io";
import TodoGroup from "./TodoGroup";

function GroupsList({
                        setError, setAddingToGroupProvider, todosInGroup, setTodosInGroupForShow, isGroupShowing,
                        setIsGroupShowing
                    }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEnter, setIsEnter] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [todoGroups, setTodoGroups] = useState([]);
    const [isGroupPosted, setIsGroupPosted] = useState(false);

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
        if (isGroupPosted) {
            FetchTodoGroups();
            setIsGroupPosted(false)
        }
    }, [isGroupPosted]);

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(groupName)
    }

    function openEnterBar() {
        setIsEnter(!isEnter)
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
            .then(() => setIsGroupPosted(true)).then(() => setGroupName("")).then(() => setIsEnter(!isEnter))
            .catch(error => console.log(error));
    }

    const handleChange = event => {
        setGroupName(event.target.value)
    }


    return (
        <div className={"left-sidebar"}>
            <IoMdAdd size={20} className={`add-group-button ${isEnter ? "visible" : ""}`} onClick={saveButtonHandler}/>
            <input type={"text"} className={`group-enter-bar ${isEnter ? "visible" : ""}`} onChange={handleChange}
                   value={groupName}/>
            <VscEdit className={"open-enter-bar-group-button"} size={20} onClick={openEnterBar}/>
            <h2> Todo Groups</h2>
            <li>
                {todoGroups.map((todoGroup) => (
                    <TodoGroup key={todoGroup.id} todoGroup={todoGroup} setTodoGroups={setTodoGroups}
                               todosInGroup={todosInGroup}
                               setAddingToGroupProvider={setAddingToGroupProvider}
                               setTodosInGroupForShow={setTodosInGroupForShow}
                               setIsGroupShowing={setIsGroupShowing}
                               isGroupShowing={isGroupShowing}
                    />
                ))}
            </li>


        </div>
    );
}


export default GroupsList;