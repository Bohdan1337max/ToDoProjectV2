using EFDataAccessLibrary;
using EFDataAccessLibrary.Models;

namespace todo_api.Repos;

public interface ITaskRepository
{
    IEnumerable<Todo> GetTasks();
    Todo AddTask(string name);
    void DeleteTask(int id);
    (bool isUpdated, Todo? taskToUpdate) UpdateTask(Todo task);
}