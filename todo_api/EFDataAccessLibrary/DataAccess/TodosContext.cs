using System;
using EFDataAccessLibrary.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using Microsoft.Extensions.Logging;

namespace EFDataAccessLibrary.DataAccess;

public class TodosContext : DbContext
{
    public TodosContext(DbContextOptions<TodosContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.LogTo(
            action: Console.WriteLine,
            minimumLevel: LogLevel.Information);
    }

    public DbSet<Todo> Todos { get; set; }
    public DbSet<TodoGroup> TodoGroups { get; set; }
}