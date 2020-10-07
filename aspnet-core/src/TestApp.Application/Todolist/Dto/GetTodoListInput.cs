using Abp.AutoMapper;
using TestApp.Todo_list;

namespace TestApp.Todolist
{
    [AutoMapTo(typeof(TodoList))]
    public class GetTodoListInput
    {
        public int Id { get; set; }
    }
}