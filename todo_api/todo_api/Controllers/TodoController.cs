using EFDataAccessLibrary;
using EFDataAccessLibrary.Models;
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
    public IEnumerable<Todo> GetTask()
    {
        return _taskRepository.GetTasks();
    }

    [HttpPost]
    public IActionResult AddTask([FromBody] string name)
    {
        if (name.Trim() == "")
            return BadRequest("Not valid task text");
        var task = _taskRepository.AddTask(name);


        return Ok(task);
    }

    [HttpDelete]
    public IActionResult DeleteTask([FromBody] int id)
    {
        _taskRepository.DeleteTask(id);
        return Ok();
    }

    [HttpPut]
    public IActionResult UpdateTask(Todo task)
    {
        var (isUpdated, updatedTask) = _taskRepository.UpdateTask(task);
        if (!isUpdated)
            return NotFound();
        return Ok(updatedTask);
    }
}