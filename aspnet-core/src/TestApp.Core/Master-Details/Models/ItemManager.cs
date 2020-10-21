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
                return await _itemRepository.InsertAsync(entity);
            }
        }

        public async Task DeleteItem(int id)
        {
            var item = await _itemRepository.FirstOrDefaultAsync(i => i.Id == id);

            if (item == null)
            {
                throw new UserFriendlyException("No item Found");
            }
            else
            {
               await _itemRepository.DeleteAsync(item);
            }
        }

        public async Task<List<Item>> GetAllItems()
        {
            return await _itemRepository.GetAllListAsync();
        }

        public async Task<Item>  GetItemById(int id)
        {
            return await _itemRepository.GetAsync(id);
        }

        public async Task UpdateItem(Item entity)
        {
          await  _itemRepository.UpdateAsync(entity);
        }
    }
}
