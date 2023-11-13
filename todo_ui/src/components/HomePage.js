import React, {useState, useEffect} from "react";
import EnterBar from "./EnterBar";
import Todo from "./Todo";
import GroupsList from "./GroupsList"
import TodoList from "./TodoList";
import {GetTodos} from "../todoService";

function HomePage() {

    const [addingToGroupProvider, setAddingToGroupProvider] = useState(false);
    const [todoGroupIdForShow, setTodoGroupIdForShow] = useState(null)
    const [todos, setTodos] = useState([]);

    //TODO Context
    //TODO add func to addSevice


    const FetchTodos = async () => {
        const todos = await GetTodos();
        setTodos(todos)
    }

    return (<div>
        <header>
            <h1>Todo LIST</h1>
            <EnterBar onTodoAdded={FetchTodos}/>
        </header>
        <main>
            <GroupsList
                setAddingToGroupProvider={setAddingToGroupProvider}
                setTodoGroupIdForShow={setTodoGroupIdForShow}
                todoGroupIdForShow={todoGroupIdForShow}
                onTodoAdded={FetchTodos}
                todos={todos}
                setTodos={setTodos}
            />
            <TodoList
                addingToGroupProvider={addingToGroupProvider}
                todoGroupIdForShow={todoGroupIdForShow}
                onTodoAdded={FetchTodos}
                todos={todos}
                setTodos={setTodos}

            />
        </main>
    </div>);

}

export default HomePage;