using EFDataAccessLibrary;
using EFDataAccessLibrary.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace todo_api.Repos;

public class LocalTaskRepository : ITaskRepository
{
    private readonly List<Todo> _tasks = new();
    private int _id;

    public IEnumerable<Todo> GetTasks()
    {
        return _tasks;
    }
    
    public Todo AddTask(string name)
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

    public void DeleteTask(int id)
    {
        var deletedTask = _tasks.FirstOrDefault(t => t.Id == id);
        if (deletedTask != null)
            _tasks.Remove(deletedTask);
    }

    public (bool isUpdated, Todo? taskToUpdate) UpdateTask(Todo task)
    {
        var isUpdated = false;
        var taskToUpdate = _tasks.FirstOrDefault(t => t.Id == task.Id);
        if (taskToUpdate == null)
            return (isUpdated, taskToUpdate);
        isUpdated = true;
        taskToUpdate.Name = task.Name;
        taskToUpdate.Completed = task.Completed;
        return (isUpdated, taskToUpdate);
    }
}