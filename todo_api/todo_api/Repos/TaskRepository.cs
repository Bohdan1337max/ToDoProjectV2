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
    public IEnumerable<Todo> GetTasks()
    {
        return _tasksContext.Tasks.ToList();
    }

    public Todo AddTask(string name)
    {
        var task = new Todo()
        {
            Completed = false,
            Name = name
        };

       var taskFromDb =  _tasksContext.Tasks.Add(task);
        _tasksContext.SaveChanges();
        return taskFromDb.Entity;
    }

    public void DeleteTask(int id)
    {
        throw new NotImplementedException();
    }

    public (bool isUpdated, Todo? taskToUpdate) UpdateTask(Todo task)
    {
        throw new NotImplementedException();
    }
}