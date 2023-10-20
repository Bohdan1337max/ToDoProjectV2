import React, {useState, useEffect} from "react";
import EnterBar from "./EnterBar";
import Todo from "./Todo";
import GroupsList from "./GroupsList"
import TodoList from "./TodoList";
import {render} from "@testing-library/react";

function HomePage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPosted, setIsPosted] = useState(false);

    const [todoGroups, setTodoGroups] = useState([]);
    const [todosInGroup, setTodosInGroup] = useState([]);
    const [addingToGroupProvider, setAddingToGroupProvider] = useState(false);
    const [todosInGroupForShow, setTodosInGroupForShow ] = useState([]);


    return (
        <div>
            <header>
                <h1>Todo LIST</h1>
                <EnterBar isPosted={isPosted} setIsPosted={setIsPosted}/>
            </header>
            <main>
                <GroupsList todoGroups={todoGroups} setTodoGroups={setTodoGroups} todosInGroup = {todosInGroup} setIsPosted={setIsPosted}
                            setAddingToGroupProvider={setAddingToGroupProvider} setTodosInGroupForShow = {todosInGroupForShow}/>
                <TodoList/>
            </main>
        </div>
    );
}