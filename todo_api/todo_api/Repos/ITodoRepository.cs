using EFDataAccessLibrary;
using EFDataAccessLibrary.Models;

namespace todo_api.Repos;

public interface ITodoRepository
{
    IEnumerable<Todo> GetTodo();
    IEnumerable<Todo> GetSubTodosInTodo(int todoId);
    Todo AddTodo(string name);
    bool DeleteTodo(int id);
    bool AddSubTodo(int parentTodoId, int[] subTodos);
    (bool isUpdated, Todo? updatedTodo) UpdateTodo(Todo todo);
}