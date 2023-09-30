using EFDataAccessLibrary;
using EFDataAccessLibrary.Models;

namespace todo_api.Repos;

public interface ITodoRepository
{
    IEnumerable<Todo> GetTodo();
    Todo AddTodo(string name);
    bool DeleteTodo(int id);
    (bool isUpdated, Todo? updatedTodo) UpdateTodo(Todo todo);
}