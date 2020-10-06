using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Todo_list;

namespace TestApp.Todolist
{
    public interface ITodolistAppService : IApplicationService
    {
        void CreateTask(TodoListDto input);
        TodoList GetTaskById(TodoListDto input);
        IEnumerable<TodoList> GetAllTasks();
        void UpdateTask(TodoListDto input);
        void DeleteTask(TodoListDto input);
    }
}
