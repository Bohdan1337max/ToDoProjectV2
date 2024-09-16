import React, {useState, useEffect} from "react";
import {HiOutlineTrash, HiCheck, HiX} from "react-icons/hi";
import {IoMdAdd} from "react-icons/io";

function TodoGroup({
                       todoGroup,
                       setTodoGroups,
                       setAddingToGroupProvider,
                       addingToGroupProvider,
                       setTodoGroupIdForShow,
                       onTodoAdded,
                       todos,
                       setTodos,
                       selectedGroup,
                   }) {

    const [isAddingToGroup, setIsAddingToGroup] = useState(false);

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


    const ShowTodosInGroup = () => {
        setTodoGroupIdForShow(todoGroup.id);
    }

    const addingToGroupHandler = () => {

        if(addingToGroupProvider)
            return

        const updatedTodos = todos.map((todo) => {
            if (todo.todoGroupId === todoGroup.id) {
                return {...todo, checked: true};
            } else {
                return todo
            }
        })
        setTodos(updatedTodos);
        showAddingToGroupHandler()
    }

    const showAddingToGroupHandler = () => {
        const currentIsAddingToGroup = !isAddingToGroup;
        setIsAddingToGroup(currentIsAddingToGroup);
        setAddingToGroupProvider(currentIsAddingToGroup);
    }

    const closeAddingToGroupHandler = () => {
        const uncheckedTodos = todos.map((todo) => ({
            ...todo, checked: false,
        }))
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
        <div className={`todo-group ${selectedGroup === todoGroup ? "selected" : ""}`}>
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