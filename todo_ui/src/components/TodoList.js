import React, {useState, useEffect} from "react";
import Todo from "./Todo";

function TodoList({isLoaded,setIsLoaded, setError,isTodoPosted, setIsTodoPosted}) {
    const [todos, setTodos] = useState([]);
    const [todosInGroup, setTodosInGroup] = useState([]);


    const FetchTodos = () => {
        fetch("/todo")
            .then((res) => res.json())
            .then(
                (result) => {
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
        <ul>
            {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} setTodos={setTodos} todos={todos}
                      todosInGroup={todosInGroup}
                      setTodosInGroup={setTodosInGroup}/>
            ))}
        </ul>
    );
}


export default TodoList;
