using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Master_Detail.DTO;
using TestApp.Master_Detail.DTOp;
using TestApp.Models;

namespace TestApp.Master_Details.Order3
{
    public interface IOrderAppService : IApplicationService
    {
        Task<PagedResultDto<GetOrederOutputDTO>> GetAllOrders(PagedOrderResultRequestDto input);
        Task<Order> CreateOrder(CreateOrderInputDTO input);
        Task UpdateOrder(GetOrederOutputDTO input);
        Task DeleteOrder(DeleteOrderInputDTO input);
        Task<GetOrederOutputDTO> GetOrderById(OrderInputDTO input);
    }
}
