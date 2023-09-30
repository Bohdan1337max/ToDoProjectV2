import React, { useState, useEffect } from "react";
import EnterBar from "./EnterBar";
import Todo from "./Todo";
import GroupsList from "./GroupsList"

function TodoList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPosted, setIsPosted] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todoGroups, setTodoGroups] = useState([]);


    const FetchTodos = () => {
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
    const FetchTodoGroups = () => {
        fetch("/TodoGroupController").then((res) => res.json()).then(
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
        FetchTodos();
        FetchTodoGroups();
    }, []);

    useEffect(() => {
        if (isPosted) {
            FetchTodos();
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
                    <GroupsList todoGroups={todoGroups} setTodoGroups={setTodoGroups}/>
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
