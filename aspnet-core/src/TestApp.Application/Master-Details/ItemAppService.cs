using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AutoMapper;
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
        public async Task CreateItem(CreateItemInputDTO input)
        {
            Item output = _objectMapper.Map<CreateItemInputDTO, Item>(input);
            await _itemManager.CreateItem(output);
        }

        public void DeleteItem(DeleteItemInputDTO input)
        {
            _itemManager.DeleteItem(input.Id);
        }
        
        public List<GetItemOutputDTO> GetAllItems()
        {
            var getAll = _itemManager.GetAllItems().ToList();
            List<GetItemOutputDTO> output = _objectMapper.Map<List<Item>, List<GetItemOutputDTO>>(getAll);
            return output;
        }

        public GetItemOutputDTO GetItemById(ItemInputDTO input)
        {
            var item = _itemManager.GetItemById(input.Id);
            GetItemOutputDTO output = _objectMapper.Map<Item, GetItemOutputDTO>(item);
            return output;
        }

        public void UpdateItem(UpdateItemInputDTO input)
        {
            Item output = _objectMapper.Map<UpdateItemInputDTO, Item>(input);
            _itemManager.UpdateItem(output);
        }
    }
}
