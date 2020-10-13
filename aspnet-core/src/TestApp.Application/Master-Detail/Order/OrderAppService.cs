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
using TestApp.Master_Details.Order;
using TestApp.Models;

namespace TestApp.Authorization
{
    [AbpAuthorize(PermissionNames.Pages_Orders)]
    public class OrderAppService : ApplicationService, IOrderAppService
    {
        private readonly OrderManager _orderManager;
        private readonly IMapper _objectMapper;

        public OrderAppService(OrderManager orderManager, IMapper objectMapper)
        {
            _orderManager = orderManager;
            _objectMapper = objectMapper;
        }
        public void CreateOrder(CreateOrderInputDTO input)
        {
            Order output = _objectMapper.Map<CreateOrderInputDTO, Order>(input);

            _orderManager.CreateOrder(output);
            
        }

        public void DeleteOrder(DeleteOrderInputDTO input)
        {
            _orderManager.DeleteOrder(input.Id);
        }

        public IEnumerable<GetOrederOutputDTO> GetAllOrders()
        {
            var getAll = _orderManager.GetAllOreders().ToList();
            List<GetOrederOutputDTO> output = _objectMapper.Map<List<TestApp.Models.Order>, List<GetOrederOutputDTO>>(getAll);
            return output;
        }

        public GetOrederOutputDTO GetOrderById(OrderInputDTO input)
        {
            var order = _orderManager.GetOrderById(input.Id);
            GetOrederOutputDTO output = _objectMapper.Map<TestApp.Models.Order, GetOrederOutputDTO>(order);
            return output;
        }

        public void UpdateOrder(GetOrederOutputDTO input)
        {
            TestApp.Models.Order output = _objectMapper.Map<GetOrederOutputDTO, TestApp.Models.Order>(input);
            _orderManager.UpdateOrder(output);
        }


    }
}
