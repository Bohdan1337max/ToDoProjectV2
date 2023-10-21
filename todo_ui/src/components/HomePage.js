import React, {useState, useEffect} from "react";
import EnterBar from "./EnterBar";
import Todo from "./Todo";
import GroupsList from "./GroupsList"
import TodoList from "./TodoList";

function HomePage() {

    const [isTodoPosted, setIsTodoPosted] = useState(false);
    const [todosInGroup, setTodosInGroup] = useState([]);
    const [addingToGroupProvider, setAddingToGroupProvider] = useState(false);
    const [todosInGroupForShow, setTodosInGroupForShow] = useState([]);
    const [isGroupShowing, setIsGroupShowing] = useState(false)

    return (
        <div>
            <header>
                <h1>Todo LIST</h1>
                <EnterBar setIsTodoPosted={setIsTodoPosted}/>
            </header>
            <main>
                <GroupsList  todosInGroup={todosInGroup}
                            setAddingToGroupProvider={setAddingToGroupProvider}
                             setTodosInGroupForShow={setTodosInGroupForShow}
                             setIsGroupShowing = {setIsGroupShowing}
                             isGroupShowing = {isGroupShowing}/>


                <TodoList  setIsTodoPosted={setIsTodoPosted} isTodoPosted={isTodoPosted}
                           addingToGroupProvider={addingToGroupProvider}
                           todosInGroup={todosInGroup} setTodosInGroup={setTodosInGroup}
                           todosInGroupForShow = {todosInGroupForShow}
                           isGroupShowing = {isGroupShowing}
                />
            </main>
        </div>
    );

}

export default HomePage;