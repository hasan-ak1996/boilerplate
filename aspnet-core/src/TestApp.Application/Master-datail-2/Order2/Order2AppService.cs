using Abp.Application.Services;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TestApp.Master_Details.Models;
using TestApp.Models;

namespace TestApp.Master_datail_2.Order2
{
    public class Order2AppService : ApplicationService, IOrder2AppService
    {
        private readonly OrderManager _orderManager;
        private readonly IMapper _objectMapper;

        public Order2AppService(OrderManager orderManager, IMapper objectMapper)
        {
            _orderManager = orderManager;
            _objectMapper = objectMapper;
        }

        public void CreateOrder(CreateOrder2InputDTO input)
        {
            Order output = _objectMapper.Map<CreateOrder2InputDTO, Order>(input);


            _orderManager.CreateOrder(output);

        }

        public void DeleteOrder(DeleteOrder2InputDTO input)
        {
            _orderManager.DeleteOrder(input.Id);
        }

        public IEnumerable<GetOreder2OutputDTO> GetAllOrders()
        {
            var getAll = _orderManager.GetAllOreders().ToList();
            List<GetOreder2OutputDTO> output = _objectMapper.Map<List<TestApp.Models.Order>, List<GetOreder2OutputDTO>>(getAll);
            return output;
        }

        public GetOreder2OutputDTO GetOrderById(Order2InputDTO input)
        {
            var order = _orderManager.GetOrderById(input.Id);
            GetOreder2OutputDTO output = _objectMapper.Map<TestApp.Models.Order, GetOreder2OutputDTO>(order);
            return output;
        }

        public void UpdateOrder(GetOreder2OutputDTO input)
        {
            TestApp.Models.Order output = _objectMapper.Map<GetOreder2OutputDTO, TestApp.Models.Order>(input);

            _orderManager.UpdateOrder(output);
        }
    }
}
