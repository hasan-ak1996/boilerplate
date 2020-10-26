using Abp.Application.Services.Dto;
using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Models;

namespace TestApp.Master_Details.Models
{
    public interface IOrderManager : IDomainService
    {
        Task<Order> GetOrderById(int id);
        Task<Order> CreateOrder(Order entity);
        Task DeleteOrder(int id);
        Task UpdateOrder(Order entity);
    }
}
