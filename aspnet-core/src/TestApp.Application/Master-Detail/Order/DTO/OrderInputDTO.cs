using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using TestApp.Models;

namespace TestApp.Master_Detail.DTO
{
    [AutoMapTo(typeof(Order))]
    public class OrderInputDTO
    {
        public int Id { get; set; }
    }
}
