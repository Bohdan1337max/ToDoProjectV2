import React, {useState, useEffect} from "react";
import EnterBar from "./EnterBar";
import Todo from "./Todo";
import GroupsList from "./GroupsList"
import TodoList from "./TodoList";
import {GetTodos} from "../todoService";

function HomePage() {


    const [addingToGroupProvider, setAddingToGroupProvider] = useState(false);
    const [todosInGroupForShow, setTodosInGroupForShow] = useState([]);
    const [isGroupShowing, setIsGroupShowing] = useState(false)
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
                setTodosInGroupForShow={setTodosInGroupForShow}
                setIsGroupShowing={setIsGroupShowing}
                isGroupShowing={isGroupShowing}
                onTodoAdded={FetchTodos}
                todos={todos}
                setTodos={setTodos}
            />
            <TodoList
                addingToGroupProvider={addingToGroupProvider}
                todosInGroupForShow={todosInGroupForShow}
                isGroupShowing={isGroupShowing}
                onTodoAdded={FetchTodos}
                todos={todos}
                setTodos={setTodos}

            />
        </main>
    </div>);

}

export default HomePage;