using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Todo_list;
using TestApp.Todolist.Dto;

namespace TestApp.Todolist
{
    public interface ITodolistAppService : IApplicationService
    {
        IEnumerable<GetTaskOutput> GetAllTasks();
        Task CreateTask(CreateTodoListInput input);
        GetTaskOutput GetTaskById(GetTodoListInput input);
        void UpdateTask(UpdateTodoListInput input);
        void DeleteTask(DeleteTodoListInput input);
    }


}
