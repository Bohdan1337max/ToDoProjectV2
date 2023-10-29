import React, {useState, useEffect} from "react";
import {HiOutlineTrash, HiCheck, HiX} from "react-icons/hi";
import {IoMdAdd} from "react-icons/io";
import todo from "./Todo";

function TodoGroup({
                       todoGroup,
                       setTodoGroups,
                       setAddingToGroupProvider,
                       setTodosInGroupForShow,
                       isGroupShowing,
                       setIsGroupShowing,
                       onTodoAdded,
                       todos
                   }) {

    const [isAddingToGroup, setIsAddingToGroup] = useState(false);
    const [todosInGroup, setTodosInGroup] = useState([]);
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
        )
    }

    const ShowTodosInGroup = () => {
        FetchTodosInGroup();
        if (!isGroupShowing) {
            setIsGroupShowing(true)
        }
    }

    const addingToGroupHandler = () => {
        const currentIsAddingToGroup = !isAddingToGroup;
        setIsAddingToGroup(currentIsAddingToGroup);
        setAddingToGroupProvider(currentIsAddingToGroup);

    }

    const setCheckedTodos = () => {
//todo handle checked prop before send on API
        const checkedTodos = todos.filter((todo) => todo.checked === true)
        setTodosInGroup([...todosInGroup, ...checkedTodos]);
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({checkedTodos})
        }

        fetch(`/group/${todoGroup.id}`, requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to put todos to group")
            }
        }).then(addingToGroupHandler).then(onTodoAdded)
        console.log(checkedTodos)

    }

    return (
        <div className={"todo-group"}>
            <div className={'todo-group-text'} onClick={ShowTodosInGroup}>
                {todoGroup.name}

            </div>

            {isAddingToGroup ? <div><HiCheck onClick={setCheckedTodos}/> <HiX onClick={addingToGroupHandler}/></div> :
                <div className={"add-todo-to-group-button"}>
                    <IoMdAdd onClick={addingToGroupHandler}/>
                </div>}

            <div className={"delete-group-button"}>
                <HiOutlineTrash size={"20"} color={"red"} onClick={deleteTask}/>
            </div>

        </div>
    )

}

export default TodoGroup;