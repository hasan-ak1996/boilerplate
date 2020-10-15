using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace TestApp.Master_datail_2.Order2
{
    public interface IOrder2AppService : IApplicationService
    {
        IEnumerable<GetOreder2OutputDTO> GetAllOrders();
        void CreateOrder(CreateOrder2InputDTO input);
        void UpdateOrder(UpdateOrder2InputDTO input);
        void DeleteOrder(DeleteOrder2InputDTO input);
        GetOreder2OutputDTO GetOrderById(Order2InputDTO input);
    }
}
