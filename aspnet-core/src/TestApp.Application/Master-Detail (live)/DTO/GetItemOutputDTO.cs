using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;
using TestApp.Models;

namespace TestApp.Master_Details
{
    [AutoMap(typeof(Item))]
    public class GetItemOutputDTO : EntityDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public decimal TotalPrice { get; set; }
        public int OrderId { get; set; }
    }
}