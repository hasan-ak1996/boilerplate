using Abp.AutoMapper;
using TestApp.Todo_list;

namespace TestApp.Todolist
{
    [AutoMapTo(typeof(TodoList))]
    public class DeleteTodoListInput
    {
       
        public int Id { get; set; }
    }
}