using System;
using System.ComponentModel.DataAnnotations;

namespace TestApp.Master_Details
{
    public class DeleteItemInputDTO
    {
        public int Id { get; set; }

        [Required]
        public DateTime DeletionTime { get; set; }
    }
}