using EFDataAccessLibrary.Models;

namespace todo_api.Repos;

public interface ITodoGroupRepository
{
    public TodoGroup CreateTodoGroup(string name);
    public IEnumerable<TodoGroup> GetTodoGroups();
    public bool AddTodoToGroup(int groupId,int[] todoIds);
    public bool DeleteTodoGroup(int id);
    public IEnumerable<Todo> GetTodosInGroup(int groupId);
}