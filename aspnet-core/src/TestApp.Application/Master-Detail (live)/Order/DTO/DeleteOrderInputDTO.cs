using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using TestApp.Models;

namespace TestApp.Master_Detail.DTO
{
    [AutoMapTo(typeof(Order))]
    public class DeleteOrderInputDTO
    {
        public int Id { get; set; }
        public DateTime? DeletionTime { get; set; }
    }
}
