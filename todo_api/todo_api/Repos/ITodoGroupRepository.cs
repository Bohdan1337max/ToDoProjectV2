using EFDataAccessLibrary.Models;

namespace todo_api.Repos;

public interface ITodoGroupRepository
{
    TodoGroup CreateTodoGroup(string name);
    IEnumerable<TodoGroup> GetTodoGroups();
    bool AddTodoToGroup(int groupId, int[] todoIds);
    bool DeleteTodoGroup(int id);
    IEnumerable<Todo> GetTodosInGroup(int groupId);
}