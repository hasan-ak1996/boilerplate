using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using TestApp.Models;

namespace TestApp.Master_Details.Models
{
    public class OrderManager : DomainService, IOrderManager
    {
        private readonly IRepository<Order> _orderRepository;

        public OrderManager(IRepository<Order> orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<Order> CreateOrder(Order entity)
        {
            var order = _orderRepository.FirstOrDefault(o => o.Id == entity.Id);
            if(order != null)
            {
                throw new UserFriendlyException("already Exist");
            }
            else
            {
                return await _orderRepository.InsertAsync(entity);
            }
            
        }

        public void DeleteOrder(int id)
        {
            var order = _orderRepository.FirstOrDefault( o=> o.Id == id);

            if (order == null)
            {
                throw new UserFriendlyException("No Order Found");
            }
            else
            {
                _orderRepository.Delete(order);
            }
        }

        public IEnumerable<Order> GetAllOreders()
        {
            return _orderRepository.GetAllIncluding(r=>r.Items);
        }

        public Order GetOrderById(int id)
        {
            return _orderRepository.Get(id);
        }

        public void UpdateOrder(Order entity)
        {
            _orderRepository.Update(entity);
        }
    }
}
