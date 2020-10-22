using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using TestApp.Master_Details;
using TestApp.Models;

namespace TestApp.Master_Detail.DTO
{
    [AutoMap(typeof(Order))]
    public class GetOrederOutputDTO : EntityDto
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

        public bool IsSubmit { get; set; }
        public virtual List<GetItemOutputDTO> Items { get; set; }

    }
}
