using Microsoft.AspNetCore.Mvc;
using todo_api.Repos;

namespace todo_api.Controllers;

[ApiController]
[Route("TodoController")]
public class TodoController : ControllerBase
{
    private readonly ITaskRepository _taskRepository;

    public TodoController(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    [HttpGet]
    public IEnumerable<Task> GetTask()
    {
        return _taskRepository.GetTasks();
    }

    [HttpPost]
    public Task AddTask([FromBody] string name)
    {
        return _taskRepository.AddTask(name);
    }

    [HttpDelete]
    public IActionResult DeleteTask([FromBody] int id)
    {
        _taskRepository.DeleteTask(id);
        return Ok();
    }

    [HttpPut]
    public IActionResult UpdateTask(Task task)
    {
        var (isUpdated, updatedTask) = _taskRepository.UpdateTask(task);
        if (!isUpdated)
            return NotFound();
        return Ok(updatedTask);
    }
}