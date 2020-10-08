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
        IEnumerable<Item> GetAllItems();
        Item GetItemById(int id);
        Task<Item> CreateItem(Item entity);
        void DeleteItem(int id);
        void UpdateItem(Item entity);
    }
}
