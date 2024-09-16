using EFDataAccessLibrary.DataAccess;
using EFDataAccessLibrary.Models;
using Microsoft.AspNetCore.Mvc;

namespace todo_api.Repos;

public class TodoGroupRepository : ITodoGroupRepository
{
    private readonly TodosContext _todosContext;

    public TodoGroupRepository(TodosContext todosContext)
    {
        _todosContext = todosContext;
    }

    public TodoGroup CreateTodoGroup([FromBody] string name)
    {
        var todoGroup = new TodoGroup()
        {
            Name = name
        };
        var todoGroupFromDb = _todosContext.TodoGroups.Add(todoGroup);
        _todosContext.SaveChanges();
        return todoGroupFromDb.Entity;
    }

    public IEnumerable<TodoGroup> GetTodoGroups()
    {
        return _todosContext.TodoGroups.ToList();
    }

    public bool AddTodoToGroup(int groupId, int[] todoIds)
    {
        var todoGroupFromDb = _todosContext.TodoGroups.FirstOrDefault(g => g.Id == groupId);
        if (todoGroupFromDb is null)
            return false;

        foreach (var todoId in todoIds)
        {
            var todoFromDb = _todosContext.Todos.FirstOrDefault(t => t.Id == todoId);
            if (todoFromDb is null)
                return false;
            todoFromDb.TodoGroupId = todoGroupFromDb.Id;
        }


        var todosToRemoveFromGroup = _todosContext.Todos.Where(todo => todo.TodoGroupId == groupId && !todoIds.Contains(todo.Id)).ToList();

        foreach (var todo in todosToRemoveFromGroup)
        {
                todo.TodoGroupId = null;
        }

        _todosContext.SaveChanges();
        return true;
    }

    public bool DeleteTodoGroup(int id)
    {
        var todoGroup = _todosContext.TodoGroups.FirstOrDefault(t => t.Id == id);
        if (todoGroup is null)
            return false;
        _todosContext.TodoGroups.Remove(todoGroup);
        _todosContext.SaveChanges();
        return true;
    }

    public IEnumerable<Todo> GetTodosInGroup(int groupId)
    {
        return _todosContext.Todos.Where(t => t.TodoGroupId == groupId);
    }
}