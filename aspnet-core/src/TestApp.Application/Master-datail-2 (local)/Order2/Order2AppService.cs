using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using TestApp.Master_datail_2.Order2.DTO;
using TestApp.Master_Details.Models;
using TestApp.Models;

namespace TestApp.Master_datail_2.Order2
{
    public class Order2AppService : ApplicationService, IOrder2AppService
    {
        private readonly OrderManager _orderManager;
        private readonly IMapper _objectMapper;
        private readonly IRepository<Order> orderRepository;
        private readonly ItemManager _itemManager;
        private readonly IRepository<Item> _itemRepository;

        public Order2AppService(OrderManager orderManager, IMapper objectMapper , IRepository<Order> orderRepository, ItemManager itemManager, IRepository<Item> itemRepository)
        {
            _orderManager = orderManager;
            _objectMapper = objectMapper;
            this.orderRepository = orderRepository;
            _itemManager = itemManager;
            _itemRepository = itemRepository;
        }

        public async Task<Order> CreateOrder(CreateOrder2InputDTO input)
        {
            Order output = _objectMapper.Map<CreateOrder2InputDTO, Order>(input);


           return await _orderManager.CreateOrder(output);

        }

        public async Task  DeleteOrder(DeleteOrder2InputDTO input)
        {
            await _orderManager.DeleteOrder(input.Id);
        }

        public  async Task<PagedResultDto<GetOreder2OutputDTO>> GetAllOrders(PagedOrder2ResultRequestDto input)
        {
            var ordersCount = orderRepository.Count();
            List<Order> orders;
            orders =
                await orderRepository.GetAllIncluding(o => o.Items)
                .WhereIf(input.IsSubmit != null, o => o.IsSubmit == input.IsSubmit)
                .WhereIf(input.keyword != null , o => o.Name.Contains(input.keyword)
                    || o.OrderNo.Contains(input.keyword)
                    || o.OrderDate.Contains(input.keyword)
                    || o.EmpolyeeName.Contains(input.keyword))
                .PageBy(input).ToListAsync();
                return new PagedResultDto<GetOreder2OutputDTO>
            {
                TotalCount = ordersCount,
                Items = _objectMapper.Map<List<TestApp.Models.Order>, List<GetOreder2OutputDTO>>(orders)
            };
        }

        public async Task<GetOreder2OutputDTO>  GetOrderById(Order2InputDTO input)
        {
            var order = await _orderManager.GetOrderById(input.Id);
            GetOreder2OutputDTO output = _objectMapper.Map<Order, GetOreder2OutputDTO>(order);
            return output;
        }

        public async Task UpdateOrder(GetOreder2OutputDTO input)
        {
            Order output = _objectMapper.Map<GetOreder2OutputDTO,Order>(input);

            await _orderManager.UpdateOrder(output);

            foreach (var item in input.Items)
            {
                Item itemDetail = _objectMapper.Map<GetItem2OutputDTO, Item>(item);
                if (item.Id > 0)
                {
                    var UpdatedItem = await _itemManager.GetItemById(itemDetail.Id);
                    await _itemManager.UpdateItem(UpdatedItem);
                }
                else if(item.Id < 0)
                {
                    await _itemManager.DeleteItem(item.Id * -1);
                }
            }

        }
    }
}
