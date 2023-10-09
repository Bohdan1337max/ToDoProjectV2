using EFDataAccessLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using todo_api.Repos;

namespace todo_api.Controllers;

[ApiController]
[Route("group")]
public class TodoGroupController : ControllerBase
{
    private readonly ITodoGroupRepository _todoGroupRepository;

    public TodoGroupController(ITodoGroupRepository todoGroupRepository)
    {
        _todoGroupRepository = todoGroupRepository;
    }

    [HttpGet]
    public IEnumerable<TodoGroup> GetTodoGroups()
    {
        return _todoGroupRepository.GetTodoGroups();
    }

    [HttpPost]
    public IActionResult CreateTodoGroup([FromBody] string name)
    {
        var createdGroup = _todoGroupRepository.CreateTodoGroup(name);
        return Ok(createdGroup);
    }

    [HttpDelete]
    [Route("{id:int}")]
    public IActionResult DeleteTodoGroup([FromRoute] int id)
    {
        if (!_todoGroupRepository.DeleteTodoGroup(id))
            return NotFound();
        return Ok();
    }

    [HttpPut]
    public IActionResult AddTodoToGroup(int groupId, int[] todosId)
    {
        var isTodoAddedToGroup = _todoGroupRepository.AddTodoToGroup(groupId, todosId);
        if (!isTodoAddedToGroup)
            return BadRequest("Error with todo added");
        return Ok();
    }
}