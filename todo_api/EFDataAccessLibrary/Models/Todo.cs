using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFDataAccessLibrary.Models;

[Table("todo")]
public class Todo
{
    [Column("todo_id")] [Key] public int Id { get; init; }
    [Column("name")] public string Name { get; set; } = null!;
    [Column("completed")] public bool Completed { get; set; }
    [Column("todo_group_id")] public int? TodoGroupId { get; set; }
    [Column("sub_todo_id")] public int? SubTodoId { get; set; }
}