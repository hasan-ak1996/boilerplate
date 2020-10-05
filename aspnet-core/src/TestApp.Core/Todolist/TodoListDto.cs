using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace TestApp.Todo_list
{
    [AutoMapFrom(typeof(TodoList))]
    class TodoListDto : EntityDto<int>
    {
        public int Id { get; set; }
        public string title { get; set; }
    }
}
