using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Todo_list;

namespace TestApp.Todolist
{
    public interface ITodolistManager : IDomainService
    {
        IEnumerable<TodoList> GetAllList();
        TodoList GetTaskById(int id);
        Task<TodoList> CreateTask(TodoList entity);
        void Update(TodoList entity);
        void Delete(int id);
    }
}
