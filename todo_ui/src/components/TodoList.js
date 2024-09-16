import React, {useState, useEffect} from "react";
import Todo from "./Todo";

function TodoList({
                      todos,
                      setTodos,
                      addingToGroupProvider,
                      todosInGroup,
                      setTodosInGroup,
                      todoGroupIdForShow,
                      onTodoAdded
                  }) {

    useEffect(() => {
        onTodoAdded();
    }, []);

    const filteredTodosByGroup = todoGroupIdForShow ? todos.filter((todo) => todo.todoGroupId === todoGroupIdForShow) : todos

    return (

        <ul>
            {filteredTodosByGroup.map((todo) => (
                <Todo
                    key={todo.id}
                    todo={todo}
                    setTodos={setTodos}
                    todos={todos}
                    todosInGroup={todosInGroup}
                    setTodosInGroup={setTodosInGroup}
                    addingToGroupProvider={addingToGroupProvider}
                />
            ))}
        </ul>


    );
}


export default TodoList;
