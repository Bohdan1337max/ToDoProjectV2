import React, {useState, useEffect} from "react";
import EnterBar from "./EnterBar";
import Todo from "./Todo";
import GroupsList from "./GroupsList"
import TodoList from "./TodoList";

function HomePage() {


    const [addingToGroupProvider, setAddingToGroupProvider] = useState(false);
    const [todosInGroupForShow, setTodosInGroupForShow] = useState([]);
    const [isGroupShowing, setIsGroupShowing] = useState(false)
    const [todos, setTodos] = useState([]);


    //TODO make new prop to the todos array for checked component
    //TODO Set to FALSE checkbox after adding to Group
    //TODO Context

    const HomeButtonHandler = () => {
        setIsGroupShowing(false)
    }
    const FetchTodos = () => {
        fetch("/todo")
            .then((res) => res.json())
            .then((result) => {

                const todosWithChecked = result.map((todo) => ({
                    ...todo, checked: false,
                }));
                setTodos(todosWithChecked);

            });
    }


    return (<div>
        <header>
            <h1 onClick={HomeButtonHandler}>Todo LIST</h1>
            <EnterBar onTodoAdded={FetchTodos}/>
        </header>
        <main>
            <GroupsList
                setAddingToGroupProvider={setAddingToGroupProvider}
                setTodosInGroupForShow={setTodosInGroupForShow}
                setIsGroupShowing={setIsGroupShowing}
                isGroupShowing={isGroupShowing}
                onTodoAdded={FetchTodos}
                todos = {todos}
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