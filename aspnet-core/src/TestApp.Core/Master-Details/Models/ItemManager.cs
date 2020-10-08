using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Models;

namespace TestApp.Master_Details.Models
{
    public class ItemManager : DomainService, IItemManager
    {
        private readonly IRepository<Item> _itemRepository;

        public ItemManager(IRepository<Item> itemRepository)
        {
            _itemRepository = itemRepository;
        }
        public async Task<Item> CreateItem(Item entity)
        {
            var item = _itemRepository.FirstOrDefault(i => i.Id == entity.Id);
            if (item != null)
            {
                throw new UserFriendlyException("already Exist");
            }
            else
            {
                return await _itemRepository.InsertAsync(item);
            }
        }

        public void DeleteItem(int id)
        {
            var item = _itemRepository.FirstOrDefault(i => i.Id == id);

            if (item == null)
            {
                throw new UserFriendlyException("No item Found");
            }
            else
            {
                _itemRepository.Delete(item);
            }
        }

        public IEnumerable<Item> GetAllItems()
        {
            return _itemRepository.GetAllList();
        }

        public Item GetItemById(int id)
        {
            return _itemRepository.Get(id);
        }

        public void UpdateItem(Item entity)
        {
            _itemRepository.Update(entity);
        }
    }
}
