using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Master_Detail.DTO;
using TestApp.Models;

namespace TestApp.Master_Details.Order3
{
    public interface IOrderAppService : IApplicationService
    {
        IEnumerable<GetOrederOutputDTO> GetAllOrders();
        Task<Order> CreateOrder(CreateOrderInputDTO input);
        void UpdateOrder(GetOrederOutputDTO input);
        void DeleteOrder(DeleteOrderInputDTO input);
        GetOrederOutputDTO GetOrderById(OrderInputDTO input);
    }
}
