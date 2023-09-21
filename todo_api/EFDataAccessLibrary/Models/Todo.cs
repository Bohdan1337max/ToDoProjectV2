using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EFDataAccessLibrary.Models;
[Table("task")]
public class Todo
{
    [Column("id")]
    [Key]
    public int Id { get; init; }

    [Column("name")]
    public string Name { get; set; } = null!;
    [Column("completed")]
    public bool Completed { get; set; }
}