using Abp.AutoMapper;
using TestApp.Todo_list;

namespace TestApp.Todolist
{
    [AutoMapTo(typeof(TodoList))]
    public class UpdateTodoListInput
    {
        public int Id { get; set; }
        public string title { get; set; }
    }
}