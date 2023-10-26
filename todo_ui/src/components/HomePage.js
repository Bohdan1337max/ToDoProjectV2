import React, {useState, useEffect} from "react";
import EnterBar from "./EnterBar";
import Todo from "./Todo";
import GroupsList from "./GroupsList"
import TodoList from "./TodoList";

function HomePage() {

    const [todosInGroup, setTodosInGroup] = useState([]);
    const [addingToGroupProvider, setAddingToGroupProvider] = useState(false);
    const [todosInGroupForShow, setTodosInGroupForShow] = useState([]);
    const [isGroupShowing, setIsGroupShowing] = useState(false)
    const [todos, setTodos] = useState([]);

    //TODO Add home button and value in checkBox should be from api

    //TODO Set to FALSE checkbox after adding to Group
    //TODO Context

    const HomeButtonHandler = () => {
        setIsGroupShowing(false)
    }
    const FetchTodos = () => {
        fetch("/todo")
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setTodos(result);
                }
            );
    }



    function onTodoAdded() {
        FetchTodos();
    }

    return (
        <div>
            <header>
                <h1 onClick={HomeButtonHandler}>Todo LIST</h1>
                <EnterBar onTodoAdded={onTodoAdded}/>
            </header>
            <main>
                <GroupsList todosInGroup={todosInGroup}
                            setAddingToGroupProvider={setAddingToGroupProvider}
                            setTodosInGroup={setTodosInGroup}
                            setTodosInGroupForShow={setTodosInGroupForShow}
                            setIsGroupShowing={setIsGroupShowing}
                            isGroupShowing={isGroupShowing}
                            onTodoAdded = {onTodoAdded} // or changed
                    //Replace
                />
                <TodoList
                    addingToGroupProvider={addingToGroupProvider}
                    todosInGroup={todosInGroup} setTodosInGroup={setTodosInGroup}
                    todosInGroupForShow={todosInGroupForShow}
                    isGroupShowing={isGroupShowing}
                    onTodoAdded={onTodoAdded}
                    todos={todos}
                    setTodos={setTodos}

                />
            </main>
        </div>
    );

}

export default HomePage;