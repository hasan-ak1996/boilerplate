using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading;
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

        public async Task DeleteOrder(int id)
        {
            var order = await _orderRepository.FirstOrDefaultAsync( o=> o.Id == id);

            if (order == null)
            {
                throw new UserFriendlyException("No Order Found");
            }
            else
            {
               await _orderRepository.DeleteAsync(order);
            }
        }


        public async Task<Order> GetOrderById(int id)
        {
          return  await _orderRepository.GetAllIncluding(o => o.Items)
                .Include(o => o.Files)
                .Where(i => i.Id == id).FirstOrDefaultAsync();
   
        }

        public  async Task UpdateOrder(Order entity)
        {
            await _orderRepository.UpdateAsync(entity);
        }
    }
}
