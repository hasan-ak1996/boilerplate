using Abp.AutoMapper;
using System;
using TestApp.Models;

namespace TestApp.Master_datail_2.Order2
{
    [AutoMapTo(typeof(Order))]
    public class DeleteOrder2InputDTO
    {
        public int Id { get; set; }
        public DateTime? DeletionTime { get; set; }
    }
}