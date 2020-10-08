using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TestApp.Master_Details.Order.DTO
{
    public class DeleteOrderInputDTO
    {
        public int Id { get; set; }

        [Required]
        public DateTime DeletionTime { get; set; }
    }
}
