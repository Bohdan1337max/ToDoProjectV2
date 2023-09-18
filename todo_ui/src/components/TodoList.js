import React, { useState, useEffect } from "react";
import EnterBar from "./EnterBar";
import Todo from "./Todo";

function TodoList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isPosted, setIsPosted] = useState(false);
    const [todos, setTodos] = useState([]);


    const FetchData = () => {
        fetch("/TodoController")
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
        FetchData();
    }, []); // The empty dependency array ensures this runs only once on mount

    useEffect(() => {
        if (isPosted) {
            FetchData();
            setIsPosted(false)
        }
    }, [isPosted]);


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (isLoaded) {
        return (
            <div>
                <header>
                    <h1>Todo LIST</h1>
                    <EnterBar isPosted={isPosted} setIsPosted={setIsPosted}  />
                </header>
                <main>
                    <ul>
                        {todos.map((todo) => (
                            <Todo key={todo.id} todo={todo} setTodos = {setTodos} todos = {todos}/>
                        ))}
                    </ul>
                </main>
            </div>
        );
    }
}

export default TodoList;
