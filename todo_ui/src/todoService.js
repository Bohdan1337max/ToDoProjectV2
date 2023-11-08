const todoUrl = "api/todo"
export const GetTodos = async () => {

    const response = await fetch(todoUrl);
    const json = await response.json();
    const todosWithChecked = json.map((todo) => ({
        ...todo, checked: false,
    }));
    return todosWithChecked;
}


