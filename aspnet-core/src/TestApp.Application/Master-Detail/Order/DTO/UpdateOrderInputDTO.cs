using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using TestApp.Models;

namespace TestApp.Master_Detail.DTO
{
    [AutoMapTo(typeof(Order))]
    public class UpdateOrderInputDTO
    {
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
