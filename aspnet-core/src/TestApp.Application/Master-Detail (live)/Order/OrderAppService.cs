using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services;
using Abp.Authorization;
using AutoMapper;
using System.Linq;
using System.Threading.Tasks;
using TestApp.Authorization;
using TestApp.Master_Details.Models;
using TestApp.Master_Detail.DTO;
using TestApp.Master_Details.Order3;
using TestApp.Models;
using Abp.Application.Services.Dto;
using TestApp.Master_Detail.DTOp;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using System.IO;

namespace TestApp.Authorization
{
    [AbpAuthorize(PermissionNames.Pages_Orders)]
    public class OrderAppService : ApplicationService, IOrderAppService
    {
        private readonly OrderManager _orderManager;
        private readonly IMapper _objectMapper;
        private readonly IRepository<Order> orderRepository;

        public OrderAppService(OrderManager orderManager, IMapper objectMapper , IRepository<Order> orderRepository)
        {
            _orderManager = orderManager;
            _objectMapper = objectMapper;
            this.orderRepository = orderRepository;
        }
        public async Task<Order> CreateOrder(CreateOrderInputDTO input)
        {

           
            Order output =  _objectMapper.Map<CreateOrderInputDTO, Order>(input);
            

            return await _orderManager.CreateOrder(output);
            
        }

        public async Task DeleteOrder(DeleteOrderInputDTO input)
        {
            await _orderManager.DeleteOrder(input.Id);
        }

        public async Task<PagedResultDto<GetOrederOutputDTO>> GetAllOrders(PagedOrderResultRequestDto input)
        {

            var ordersCount = orderRepository.Count();
            List<Order> orders;
            orders =
             await orderRepository.GetAllIncluding(o => o.Items)
             .WhereIf(input.IsSubmit != null,o => o.IsSubmit == input.IsSubmit)
              .WhereIf(input.keyword != null, o => o.Name.Contains(input.keyword)
                   || o.OrderNo.Contains(input.keyword)
                   || o.OrderDate.Contains(input.keyword)
                   || o.EmpolyeeName.Contains(input.keyword))
             .PageBy(input).ToListAsync();
            
            return new PagedResultDto<GetOrederOutputDTO>
            {
                TotalCount = ordersCount,
                Items = _objectMapper.Map<List<TestApp.Models.Order>, List<GetOrederOutputDTO>>(orders)
            };
        }

            //var getAll = await _orderManager.GetAllOreders();
            //List<GetOrederOutputDTO> output = _objectMapper.Map<List<TestApp.Models.Order>, List<GetOrederOutputDTO>>(getAll);
            //return output;
        

        public async Task<GetOrederOutputDTO> GetOrderById(OrderInputDTO input)
        {
            var order = await _orderManager.GetOrderById(input.Id);
            GetOrederOutputDTO output = _objectMapper.Map<TestApp.Models.Order, GetOrederOutputDTO>(order);
            return output;
        }

        public async Task UpdateOrder(GetOrederOutputDTO input)
        {
            TestApp.Models.Order output = _objectMapper.Map<GetOrederOutputDTO, TestApp.Models.Order>(input);
           await _orderManager.UpdateOrder(output);
        }


    }
}
