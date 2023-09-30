using EFDataAccessLibrary.Models;
using Microsoft.AspNetCore.Mvc;
using todo_api.Repos;

namespace todo_api.Controllers;

[ApiController]
[Route("TodoGroupController")]
public class TodoGroupController : ControllerBase
{
    private readonly ITodoGroupRepository _todoGroupRepository;

    public TodoGroupController(ITodoGroupRepository todoGroupRepository)
    {
        _todoGroupRepository = todoGroupRepository;
    }

    [HttpPost]
    public IActionResult CreateTodoGroup([FromBody] string name)
    {
        var createdGroup = _todoGroupRepository.CreateTodoGroup(name);
        return Ok(createdGroup);
    }

    [HttpGet]
    public IEnumerable<TodoGroup> GetTodoGroups()
    {
        return _todoGroupRepository.GetTodoGroups();
    }

    [HttpPut]
    public IActionResult AddTodoToGroup([FromBody] int groupId, int todoId)
    {
        var isTodoAddedToGroup = _todoGroupRepository.AddTodoToGroup(groupId, todoId);
        if (!isTodoAddedToGroup)
            return BadRequest("Error with todo added");
        return Ok();
    }
}