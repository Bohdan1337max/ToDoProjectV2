namespace todo_api.Repos;

public class TaskRepository : ITaskRepository
{
    private readonly List<Task> _tasks = new ();
    private int _id;
    public IEnumerable<Task> GetTasks()
    {
        return _tasks;
    }

    public Task AddTask(string name)
    {
        var task = new Task()
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

    public (bool isUpdated, Task? taskToUpdate) UpdateTask(Task task)
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