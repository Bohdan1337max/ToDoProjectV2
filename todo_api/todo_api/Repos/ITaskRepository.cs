namespace todo_api.Repos;

public interface ITaskRepository
{
    IEnumerable<Task> GetTasks();
    Task AddTask(string name);
    void DeleteTask(int id);
    (bool isUpdated, Task? taskToUpdate) UpdateTask(Task task);
}