using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Models;

namespace TestApp.Master_Details.Models
{
    public interface IItemManager : IDomainService
    {
        Task<List<Item>> GetAllItems();
        Task<Item> GetItemById(int id);
        Task<Item> CreateItem(Item entity);
        Task DeleteItem(int id);
        Task UpdateItem(Item entity);
    }
}
