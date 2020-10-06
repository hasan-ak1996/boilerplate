using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
    public class TodolistAppService : ApplicationService, ITodolistAppService
    {
        private readonly IRepository<TodoList> repository;

        public TodolistAppService(IRepository<TodoList> repository)
        {
            this.repository = repository;
        }

        public void UpdateTask(TodoListDto input)
        {
            var newTask = repository.Get(input.Id);
            repository.Update(newTask);
        }
        public void DeleteTask(TodoListDto input)
        {
            var task = repository.Get(input.Id);
            repository.Delete(task);
        }

        public void CreateTask(TodoListDto input)
        {
            var task = new TodoList { Id = input.Id, title = input.title };
            repository.Insert(task);
        }

        public TodoList GetTaskById(TodoListDto input)
        {
            var task = repository.Get(input.Id);
            return task;
        }

        public IEnumerable<TodoList> GetAllTasks()
        {
            List<TodoList> tasks = repository.GetAllList();
            return tasks;
        }



    }
}
