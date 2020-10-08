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
        IEnumerable<Order> GetAllOreders();
        Order GetOrderById(int id);
        Task<Order> CreateOrder(Order entity);
        void DeleteOrder(int id);
        void UpdateOrder(Order entity);
    }
}
