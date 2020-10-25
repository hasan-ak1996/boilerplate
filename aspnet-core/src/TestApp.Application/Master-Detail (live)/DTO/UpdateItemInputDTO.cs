using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.ComponentModel.DataAnnotations;
using TestApp.Models;

namespace TestApp.Master_Details
{
    [AutoMapTo(typeof(Item))]
    public class UpdateItemInputDTO : EntityDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal TotalPrice { get; set; }

       
        public DateTime LastModificationTime { get; set; }
    }
}