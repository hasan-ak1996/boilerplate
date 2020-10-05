using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using Abp.Domain.Entities;
namespace TestApp.Todo_list
{
    public class TodoList : Entity<int>
    {
        public int Id { get; set; }
        public string title { get; set; }
    }
}
