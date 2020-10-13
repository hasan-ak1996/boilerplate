using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Master_Detail.DTO;

namespace TestApp.Master_Details.Order
{
    public interface IOrderAppService : IApplicationService
    {
        IEnumerable<GetOrederOutputDTO> GetAllOrders();
        void CreateOrder(CreateOrderInputDTO input);
        void UpdateOrder(GetOrederOutputDTO input);
        void DeleteOrder(DeleteOrderInputDTO input);
        GetOrederOutputDTO GetOrderById(OrderInputDTO input);
    }
}
