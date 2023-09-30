using EFDataAccessLibrary;
using EFDataAccessLibrary.DataAccess;
using EFDataAccessLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace todo_api.Repos;

public class TodoRepository : ITodoRepository
{
    private readonly TodosContext _todosContext;

    public TodoRepository(TodosContext todosContext)
    {
        _todosContext = todosContext;
    }

    public IEnumerable<Todo> GetTodo()
    {
        return _todosContext.Todos.ToList();
    }

    public Todo AddTodo(string name)
    {
        var task = new Todo()
        {
            Completed = false,
            Name = name
        };

        var taskFromDb = _todosContext.Todos.Add(task);
        _todosContext.SaveChanges();
        return taskFromDb.Entity;
    }

    public bool DeleteTodo(int id)
    {
        var task = _todosContext.Todos.FirstOrDefault(t => t.Id == id);
        if (task is null)
            return false;
        _todosContext.Todos.Remove(task);
        _todosContext.SaveChanges();
        return true;
    }

    public (bool isUpdated, Todo? updatedTodo) UpdateTodo(Todo todo)
    {
        var isUpdated = false;
        var todoToUpdate = _todosContext.Todos.FirstOrDefault(t => t.Id == todo.Id);
        if (todoToUpdate is null)
            return (isUpdated, todoToUpdate);

        todoToUpdate.Name = todo.Name;
        todoToUpdate.Completed = todo.Completed;
        isUpdated = true;

        _todosContext.SaveChanges();
        return (isUpdated, todoToUpdate);
    }
}