using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using TestApp.Authorization.Roles;
using TestApp.Authorization.Users;
using TestApp.MultiTenancy;
using TestApp.Todo_list;
using TestApp.Models;

namespace TestApp.EntityFrameworkCore
{
    public class TestAppDbContext : AbpZeroDbContext<Tenant, Role, User, TestAppDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<TodoList> Todolist { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Item> Item { get; set; }
        public TestAppDbContext(DbContextOptions<TestAppDbContext> options)
            : base(options)
        {
        }
    }
}
