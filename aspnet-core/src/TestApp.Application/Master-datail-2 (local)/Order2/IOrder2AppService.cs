using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Master_datail_2.Order2.DTO;
using TestApp.Models;

namespace TestApp.Master_datail_2.Order2
{
    public interface IOrder2AppService : IApplicationService
    {
        Task<PagedResultDto<GetOreder2OutputDTO>> GetAllOrders(PagedOrder2ResultRequestDto input);
        Task<Order> CreateOrder(CreateOrder2InputDTO input);
        Task UpdateOrder(GetOreder2OutputDTO input);
        Task DeleteOrder(DeleteOrder2InputDTO input);
        Task<GetOreder2OutputDTO> GetOrderById(Order2InputDTO input);
    }
}
