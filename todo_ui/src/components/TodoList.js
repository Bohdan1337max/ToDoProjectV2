import React, {useState, useEffect} from "react";
import Todo from "./Todo";

function TodoList({
                      todos,
                      setTodos,
                      addingToGroupProvider,
                      todosInGroup,
                      setTodosInGroup,
                      isGroupShowing,
                      todosInGroupForShow,
                      OnTodoAdded: onTodoAdded
                  }) {



//Todo replace useEfectOn Function On TodoAdded

    useEffect(() => {
        onTodoAdded();
    },[]);
    return (
        <div>
            {isGroupShowing ? (
                <ul>
                    {todosInGroupForShow.map((todo) => (
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
            ) : (
                <ul>
                    {todos.map((todo) => (
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
            )}
        </div>
    );
}


export default TodoList;
