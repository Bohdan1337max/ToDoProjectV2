using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFDataAccessLibrary.Models;

[Table("todo_group")]
public class TodoGroup
{
    [Column("todo_group_id")] [Key] public int Id { get; set; }

    [Column("name")] public string Name { get; set; }

    //public List<Todo> Todos { get; set; } = new List<Todo>();
}