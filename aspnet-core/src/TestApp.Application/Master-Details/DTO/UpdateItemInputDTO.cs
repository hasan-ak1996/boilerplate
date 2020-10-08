using System;
using System.ComponentModel.DataAnnotations;

namespace TestApp.Master_Details
{
    public class UpdateItemInputDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal TotalPrice { get; set; }

        [Required]
        public DateTime LastModificationTime { get; set; }
    }
}