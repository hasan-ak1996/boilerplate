using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using TestApp.Todo_list;

namespace TestApp.Todolist.Dto
{
    [AutoMapTo(typeof(TodoList))]
    public class GetTaskOutput
    {
        public int Id { get; set; }
        public string title { get; set; }
    }
}
