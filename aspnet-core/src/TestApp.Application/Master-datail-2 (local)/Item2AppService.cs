using Abp.Application.Services;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestApp.Master_Details.Models;
using TestApp.Models;

namespace TestApp.Master_datail_2
{
    public class Item2AppService : ApplicationService, IItem2AppService
    {
        private readonly ItemManager _itemManager;
        private readonly IMapper _objectMapper;
        public Item2AppService(ItemManager itemManager, IMapper objectMapper)
        {
            _itemManager = itemManager;
            _objectMapper = objectMapper;
        }

        public async Task<Item> CreateItem(CreateItem2InputDTO input)
        {
            Item output = _objectMapper.Map<CreateItem2InputDTO, Item>(input);

           return await _itemManager.CreateItem(output);

        }

        public async Task DeleteItem(DeleteItem2InputDTO input)
        {
            await _itemManager.DeleteItem(input.Id);
        }

        public async Task<List<GetItem2OutputDTO>> GetAllItems()
        {
            var getAll = await _itemManager.GetAllItems();
            List<GetItem2OutputDTO> output = _objectMapper.Map<List<Item>, List<GetItem2OutputDTO>>(getAll);
            return output;
        }

        public async Task<GetItem2OutputDTO> GetItemById(Item2InputDTO input)
        {
            var item = await _itemManager.GetItemById(input.Id);
            GetItem2OutputDTO output = _objectMapper.Map<Item, GetItem2OutputDTO>(item);
            return output;
        }

        public async Task UpdateItem(UpdateItem2InputDTO input)
        {
            Item output = _objectMapper.Map<UpdateItem2InputDTO, Item>(input);
            await _itemManager.UpdateItem(output);
        }
    }



}
