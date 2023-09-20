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
    public IActionResult AddTask([FromBody] string name)
    {
        var (isValid, task) = _taskRepository.AddTask(name);
        if (!isValid)
            return BadRequest("Not valid task text");
        return Ok(task);        
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