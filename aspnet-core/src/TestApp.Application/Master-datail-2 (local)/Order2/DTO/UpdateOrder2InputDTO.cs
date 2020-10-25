using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TestApp.Models;

namespace TestApp.Master_datail_2.Order2
{
    [AutoMapTo(typeof(Order))]
    public class UpdateOrder2InputDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string OrderNo { get; set; }

        [Required]
        public string OrderDate { get; set; }

        public bool IsSubmit { get; set; }

        [Required]
        public DateTime LastModificationTime { get; set; }

        [Required]
        public string EmpolyeeName { get; set; }

        [Required]
        public decimal TotalPrice { get; set; }

        [Required]
        public List<Item> Items { get; set; }
    }
}