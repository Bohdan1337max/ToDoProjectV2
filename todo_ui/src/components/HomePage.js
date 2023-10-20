import React, {useState, useEffect} from "react";
import EnterBar from "./EnterBar";
import Todo from "./Todo";
import GroupsList from "./GroupsList"
import TodoList from "./TodoList";

function HomePage() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isTodoPosted, setIsTodoPosted] = useState(false);
    const [todosInGroup, setTodosInGroup] = useState([]);
    const [addingToGroupProvider, setAddingToGroupProvider] = useState(false);
    const [todosInGroupForShow, setTodosInGroupForShow] = useState([]);



        return (

            <div>
                <header>
                    <h1>Todo LIST</h1>
                    <EnterBar setIsTodoPosted={setIsTodoPosted}/>
                </header>
                <main>
                    <GroupsList setIsLoaded={setIsLoaded} todosInGroup={todosInGroup}

                                setAddingToGroupProvider={setAddingToGroupProvider}
                                setTodosInGroupForShow={todosInGroupForShow}/>

                    <TodoList setIsLoaded={setIsLoaded} setIsTodoPosted={setIsTodoPosted} isTodoPosted={isTodoPosted}
                             />
                </main>
            </div>
        );

}

export default HomePage;