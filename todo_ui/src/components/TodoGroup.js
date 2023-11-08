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
                       todos,
                       setTodos
                   }) {

    const [isAddingToGroup, setIsAddingToGroup] = useState(false);
    const [todosInGroup, setTodosInGroup] = useState([]);

    function deleteTask() {
        const requestOptions = {
            method: "DELETE", headers: {"Content-Type": "application/json"}
        };
        fetch(`api/group/${todoGroup.id}`, requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete task group");
            }
        }).then(() => setTodoGroups(prev => prev.filter(el => el.id !== todoGroup.id)))
    }

    const FetchTodosInGroup = () => {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"}
        };
        fetch(`api/group/todosInGroup/${todoGroup.id}`, requestOptions).then((res) => res.json()).then(
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
        const updatedTodos = todos.map((todo) => {
            if (todo.todoGroupId === todoGroup.id) {
                return {...todo, checked: true};
            } else {
                return todo
            }
        })

        setTodos(updatedTodos);

        showAddingToGroupHandler();
        console.log(updatedTodos)
    }

    const showAddingToGroupHandler = () => {
        const currentIsAddingToGroup = !isAddingToGroup;
        setIsAddingToGroup(currentIsAddingToGroup);
        setAddingToGroupProvider(currentIsAddingToGroup);
    }

    const closeAddingToGroupHandler = () => {
       const uncheckedTodos = todos.map((todo) => ({
            ...todo, checked: false,
        }) )
        showAddingToGroupHandler();
       setTodos(uncheckedTodos)
        console.log(todos)
    }
    const setCheckedTodos = () => {
        const checkedTodos = todos.filter((todo) => todo.checked === true)
        const todosInGroup = checkedTodos.map((todo) => todo.id)
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({todosInGroup})
        }

        fetch(`api/group/${todoGroup.id}`, requestOptions).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to put todos to group")
            }
        }).then(showAddingToGroupHandler).then(onTodoAdded)

    }

    return (
        <div className={"todo-group"}>
            <div className={'todo-group-text'} onClick={ShowTodosInGroup}>
                {todoGroup.name}

            </div>

            {isAddingToGroup ?
                <div><HiCheck onClick={setCheckedTodos}/> <HiX onClick={closeAddingToGroupHandler}/></div> :
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