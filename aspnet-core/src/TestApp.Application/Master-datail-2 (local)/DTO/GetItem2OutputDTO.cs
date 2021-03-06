﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using TestApp.Models;

namespace TestApp.Master_datail_2
{
    [AutoMap(typeof(Item))]
    public class GetItem2OutputDTO : EntityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public int OrderId { get; set; }
    }
}