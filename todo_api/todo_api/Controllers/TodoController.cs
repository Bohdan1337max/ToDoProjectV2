using EFDataAccessLibrary;
using EFDataAccessLibrary.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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
    public IEnumerable<Todo> GetTodo()
    {
        return _taskRepository.GetTodo();
    }

    [HttpPost]
    public IActionResult AddTodo([FromBody] string name)
    {
        if (name.Trim() == "")
            return BadRequest("Not valid task text");
        var task = _taskRepository.AddTodo(name);


        return Ok(task);
    }

    [HttpDelete]
    public IActionResult DeleteTodo([FromBody] int id)
    {
        if (!_taskRepository.DeleteTodo(id))
            return NotFound();
        return Ok();
    }

    [HttpPut]
    public IActionResult UpdateTask(Todo todo)
    {
        var (isUpdated, updatedTask) = _taskRepository.UpdateTodo(todo);
        if (!isUpdated)
            return NotFound();
        return Ok(updatedTask);
    }
}