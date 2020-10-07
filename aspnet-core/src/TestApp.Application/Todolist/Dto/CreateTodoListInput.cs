using Abp.Domain.Entities.Auditing;
using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using TestApp.Todo_list;

namespace TestApp.Todolist
{
    [AutoMapTo(typeof(TodoList))]
    public class CreateTodoListInput
    {  
        public string title { get; set; }
    }
}