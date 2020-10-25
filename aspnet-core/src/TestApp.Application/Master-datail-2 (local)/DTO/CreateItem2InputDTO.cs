using Abp.AutoMapper;
using System;
using System.ComponentModel.DataAnnotations;
using TestApp.Models;

namespace TestApp.Master_datail_2
{
    [AutoMapTo(typeof(Item))]
    public class CreateItem2InputDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime CreationTime { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal TotalPrice { get; set; }
        public int OrderId { get; set; }
    }
}