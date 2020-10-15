using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.Collections.Generic;
using TestApp.Models;

namespace TestApp.Master_datail_2.Order2
{
    [AutoMap(typeof(Order))]
    public class GetOreder2OutputDTO : EntityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string OrderNo { get; set; }
        public string OrderDate { get; set; }
        public string EmpolyeeName { get; set; }
        public decimal TotalPrice { get; set; }
        public virtual List<Item> Items { get; set; }
    }
}