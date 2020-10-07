using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Webhooks;
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
using TestApp.Todolist.Dto;

namespace TestApp.Todolist
{
    
    [AbpAuthorize(PermissionNames.Pages_Todolist)]
    public class TodolistAppService : ApplicationService, ITodolistAppService
    {
        private readonly TodolistManager _todolistManager;
        private readonly IMapper _objectMapper;
        public TodolistAppService(TodolistManager todolistManager , IMapper objectMapper)
        {
            _todolistManager = todolistManager;
            _objectMapper = objectMapper;
        }

        public async Task CreateTask(CreateTodoListInput input)
        {
            TodoList output = _objectMapper.Map<CreateTodoListInput, TodoList>(input);
            await _todolistManager.CreateTask(output);
           
        }

        public void DeleteTask(DeleteTodoListInput input)
        {
            _todolistManager.Delete(input.Id);
        }

        public IEnumerable<GetTaskOutput> GetAllTasks()
        {
            var getAll = _todolistManager.GetAllList().ToList();
            List<GetTaskOutput> output = _objectMapper.Map<List<TodoList>,List<GetTaskOutput>>(getAll);
            return output;
        }

        public GetTaskOutput GetTaskById(GetTodoListInput input)
        {
            var task = _todolistManager.GetTaskById(input.Id);
            GetTaskOutput output = _objectMapper.Map<TodoList, GetTaskOutput>(task);
            return output;
        }

        public void UpdateTask(UpdateTodoListInput input)
        {
            TodoList output = _objectMapper.Map<UpdateTodoListInput, TodoList>(input);
            _todolistManager.Update(output);
        }
    }
}
