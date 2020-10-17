using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TestApp.Models;

namespace TestApp.Master_datail_2.Order2
{
    [AutoMap(typeof(Order))]
    public class GetOreder2OutputDTO : EntityDto
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string OrderNo { get; set; }
        [Required]
        public string OrderDate { get; set; }
        [Required]
        public string EmpolyeeName { get; set; }
        [Required]
        public decimal TotalPrice { get; set; }
        [Required]
        public virtual List<GetItem2OutputDTO> Items { get; set; }
    }
}