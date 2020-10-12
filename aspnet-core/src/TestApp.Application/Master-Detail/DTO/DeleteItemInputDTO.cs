using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.ComponentModel.DataAnnotations;
using TestApp.Models;

namespace TestApp.Master_Details
{
    [AutoMapTo(typeof(Item))]
    public class DeleteItemInputDTO 
    {
        public int Id { get; set; }


        public DateTime? DeletionTime { get; set; }
    }
}