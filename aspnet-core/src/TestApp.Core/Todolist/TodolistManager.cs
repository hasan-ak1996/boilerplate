using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using TestApp.Todo_list;

namespace TestApp.Todolist
{
    public class TodolistManager : DomainService, ITodolistManager
    {
        private readonly IRepository<TodoList> _repository;

        public TodolistManager(IRepository<TodoList> repository)
        {
            _repository = repository;
        }
        public async Task<TodoList> CreateTask(TodoList entity)
        {
            var task = _repository.FirstOrDefault(x => x.Id == entity.Id);
            if(task != null)
            {
                throw new UserFriendlyException("already Exist");
            }
            else
            {
                return await _repository.InsertAsync(task);
            }
        }

        public void Delete(int id)
        {
            var task = _repository.FirstOrDefault(x => x.Id == id);
            if(task == null)
            {
                throw new UserFriendlyException("No Data Found");
            }
            else
            {
                _repository.Delete(task);
            }
        }

        public IEnumerable<TodoList> GetAllList()
        {
            return _repository.GetAllList();
        }

        public TodoList GetTaskById(int id)
        {
            return _repository.Get(id);
        }

        public void Update(TodoList entity)
        {
            _repository.Update(entity);
        }
    }
}
