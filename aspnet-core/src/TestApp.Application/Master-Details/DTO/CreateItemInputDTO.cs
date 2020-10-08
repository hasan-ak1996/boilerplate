using System;
using System.ComponentModel.DataAnnotations;

namespace TestApp.Master_Details
{
    public class CreateItemInputDTO
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
    }
}