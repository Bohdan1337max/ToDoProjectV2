using EFDataAccessLibrary;
using EFDataAccessLibrary.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using todo_api.Repos;

namespace todo_api.Controllers;

[ApiController]
[Route("api/todo")]
public class TodoController : ControllerBase
{
    private readonly ITodoRepository _todoRepository;

    public TodoController(ITodoRepository todoRepository)
    {
        _todoRepository = todoRepository;
    }

    [HttpGet]
    public IEnumerable<Todo> GetTodo()
    {
        return _todoRepository.GetTodo();
    }
    
    [HttpGet]
    [Route("subTodosInTodo/{todoId:int}")]
    public IEnumerable<Todo> GetSubTodosInTodo(int todoId)
    {
        return _todoRepository.GetSubTodosInTodo(todoId);
    }
    
    [HttpPost]
    public IActionResult AddTodo([FromBody] string name)
    {
        if (name.Trim() == "")
            return BadRequest("Not valid task text");
        var task = _todoRepository.AddTodo(name);

        return Ok(task);
    }

    [HttpDelete]
    [Route("{id:int}")]
    public IActionResult DeleteTodo([FromRoute] int id)
    {
        if (!_todoRepository.DeleteTodo(id))
            return NotFound();
        return Ok();
    }

    [HttpPut]
    public IActionResult UpdateTodo(Todo todo)
    {
        var (isUpdated, updatedTask) = _todoRepository.UpdateTodo(todo);
        if (!isUpdated)
            return NotFound();
        return Ok(updatedTask);
    }

    [HttpPut]
    [Route("{parentTodoId:int}")]
    public IActionResult AddSubTodo([FromRoute] int parentTodoId,[FromBody] SubTodoIds subTodoIds)
    {
        if (!_todoRepository.AddSubTodo(parentTodoId, subTodoIds.SubTodoIdsInTodo))
            return NotFound();
        return Ok();
    }
}