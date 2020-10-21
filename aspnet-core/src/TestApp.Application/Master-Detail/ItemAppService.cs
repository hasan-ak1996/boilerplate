using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AutoMapper;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestApp.Master_Details.Models;
using TestApp.Models;

namespace TestApp.Master_Details
{
    public class ItemAppService : ApplicationService, IItemAppService
    {
        private readonly ItemManager _itemManager;
        private readonly IMapper _objectMapper;

        public ItemAppService(ItemManager itemManager, IMapper objectMapper)
        {
            _itemManager = itemManager;
            _objectMapper = objectMapper;
        }
        public async Task<Item> CreateItem(CreateItemInputDTO input)
        {
            Item output = _objectMapper.Map<CreateItemInputDTO, Item>(input);

             return await _itemManager.CreateItem(output);
           
        }

        public async Task DeleteItem(DeleteItemInputDTO input)
        {
           await _itemManager.DeleteItem(input.Id);
        }
        
        public async Task<List<GetItemOutputDTO>> GetAllItems()
        {
            var getAll = await _itemManager.GetAllItems();
            List<GetItemOutputDTO> output = _objectMapper.Map<List<Item>, List<GetItemOutputDTO>>(getAll);
            return output;
        }

        public async Task<GetItemOutputDTO> GetItemById(ItemInputDTO input)
        {
            var item = await _itemManager.GetItemById(input.Id);
            GetItemOutputDTO output = _objectMapper.Map<Item, GetItemOutputDTO>(item);
            return output;
        }

        public async Task UpdateItem(GetItemOutputDTO input)
        {
            Item output = _objectMapper.Map<GetItemOutputDTO, Item>(input);
            await _itemManager.UpdateItem(output);
        }
    }
}
