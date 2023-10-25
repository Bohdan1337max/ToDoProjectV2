import React, {useState, useEffect} from "react";
import Todo from "./Todo";

function TodoList({
                      setError,
                      isTodoPosted,
                      setIsTodoPosted,
                      addingToGroupProvider,
                      todosInGroup,
                      setTodosInGroup,
                      isGroupShowing,
                      todosInGroupForShow
                  }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [todos, setTodos] = useState([]);


    const FetchTodos = () => {
        fetch("/todo")
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setIsLoaded(true);
                    setTodos(result);
                },
                (error) => {
                    setIsLoaded(false);
                    setError(error);
                }
            );
    }

    useEffect(() => {
        FetchTodos();
    }, []);


    useEffect(() => {
        if (isTodoPosted) {
            FetchTodos();
            setIsTodoPosted(false)
        }
    }, [isTodoPosted]);

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
