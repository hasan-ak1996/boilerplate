using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestApp.Authorization;
using TestApp.Todo_list;

namespace TestApp.Todolist
{
    [AbpAuthorize(PermissionNames.Pages_Todolist)]
    public class TodolistAppService : CrudAppService<TodoList, TodoListDto>
    {
        public TodolistAppService(IRepository<TodoList, int> repository) : base(repository)
        {
        }

    }
}
