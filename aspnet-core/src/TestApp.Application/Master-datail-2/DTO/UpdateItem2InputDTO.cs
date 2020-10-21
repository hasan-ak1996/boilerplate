using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.ComponentModel.DataAnnotations;
using TestApp.Models;

namespace TestApp.Master_datail_2
{
    [AutoMapTo(typeof(Item))]
    public class UpdateItem2InputDTO : EntityDto
    {

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal TotalPrice { get; set; }


        public DateTime? LastModificationTime { get; set; }
        public int OrderId { get; set; }
    }
}