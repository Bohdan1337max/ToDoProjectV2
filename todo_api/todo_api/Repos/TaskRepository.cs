using EFDataAccessLibrary;
using EFDataAccessLibrary.DataAccess;
using EFDataAccessLibrary.Models;
using Microsoft.EntityFrameworkCore;

namespace todo_api.Repos;

public class TaskRepository : ITaskRepository
{
    private readonly TasksContext _tasksContext;

    public TaskRepository(TasksContext tasksContext)
    {
        _tasksContext = tasksContext;
    }

    public IEnumerable<Todo> GetTodo()
    {
        return _tasksContext.Tasks.ToList();
    }

    public Todo AddTodo(string name)
    {
        var task = new Todo()
        {
            Completed = false,
            Name = name
        };

        var taskFromDb = _tasksContext.Tasks.Add(task);
        _tasksContext.SaveChanges();
        return taskFromDb.Entity;
    }

    public bool DeleteTodo(int id)
    {
        var task = _tasksContext.Tasks.FirstOrDefault(t => t.Id == id);
        if (task is null)
            return false;
        _tasksContext.Tasks.Remove(task);
        _tasksContext.SaveChanges();
        return true;
    }

    public (bool isUpdated, Todo? updatedTodo) UpdateTodo(Todo todo)
    {
        var isUpdated = false;
        var todoToUpdate = _tasksContext.Tasks.FirstOrDefault(t => t.Id == todo.Id);
        if (todoToUpdate is null)
            return (isUpdated, todoToUpdate);

        todoToUpdate.Name = todo.Name;
        todoToUpdate.Completed = todo.Completed;
        isUpdated = true;

        _tasksContext.SaveChanges();
        return (isUpdated, todoToUpdate);
    }
}