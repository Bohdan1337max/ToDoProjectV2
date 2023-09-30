using EFDataAccessLibrary;
using EFDataAccessLibrary.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace todo_api.Repos;

public class LocalTodoRepository : ITodoRepository
{
    private readonly List<Todo> _tasks = new();
    private int _id;

    public IEnumerable<Todo> GetTodo()
    {
        return _tasks;
    }

    public Todo AddTodo(string name)
    {
        var task = new Todo()
        {
            Id = _id + 1,
            Completed = false,
            Name = name
        };
        _id++;
        _tasks.Add(task);
        return task;
    }

    public bool DeleteTodo(int id)
    {
        var deletedTask = _tasks.FirstOrDefault(t => t.Id == id);
        if (deletedTask == null) return false;
        _tasks.Remove(deletedTask);
        return true;
    }

    public (bool isUpdated, Todo? updatedTodo) UpdateTodo(Todo todo)
    {
        var isUpdated = false;
        var taskToUpdate = _tasks.FirstOrDefault(t => t.Id == todo.Id);
        if (taskToUpdate == null)
            return (isUpdated, taskToUpdate);
        isUpdated = true;
        taskToUpdate.Name = todo.Name;
        taskToUpdate.Completed = todo.Completed;
        return (isUpdated, taskToUpdate);
    }
}