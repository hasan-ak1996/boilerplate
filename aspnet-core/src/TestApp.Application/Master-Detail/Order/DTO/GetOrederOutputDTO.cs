using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using TestApp.Models;

namespace TestApp.Master_Detail.DTO
{
    [AutoMapFrom(typeof(Order))]
    public class GetOrederOutputDTO : EntityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string OrderNo { get; set; }
        public string OrderDate { get; set; }
        public string EmpolyeeName { get; set; }
        public decimal TotalPrice { get; set; }
        public List<Item> Items { get; set; }
    }
}
