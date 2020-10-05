using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using TestApp.Todo_list;

namespace TestApp.Todolist
{
    [AutoMapFrom(typeof(TodoList))]
    public class TodoListDto : EntityDto<int>
    {
        public int Id { get; set; }
        public string title { get; set; }
    }
}