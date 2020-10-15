using Abp.Application.Services;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public void CreateItem(CreateItem2InputDTO input)
        {
            Item output = _objectMapper.Map<CreateItem2InputDTO, Item>(input);

            _itemManager.CreateItem(output);

        }

        public void DeleteItem(DeleteItem2InputDTO input)
        {
            _itemManager.DeleteItem(input.Id);
        }

        public List<GetItem2OutputDTO> GetAllItems()
        {
            var getAll = _itemManager.GetAllItems().ToList();
            List<GetItem2OutputDTO> output = _objectMapper.Map<List<Item>, List<GetItem2OutputDTO>>(getAll);
            return output;
        }

        public GetItem2OutputDTO GetItemById(Item2InputDTO input)
        {
            var item = _itemManager.GetItemById(input.Id);
            GetItem2OutputDTO output = _objectMapper.Map<Item, GetItem2OutputDTO>(item);
            return output;
        }

        public void UpdateItem(UpdateItem2InputDTO input)
        {
            Item output = _objectMapper.Map<UpdateItem2InputDTO, Item>(input);
            _itemManager.UpdateItem(output);
        }
    }



}
