using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using TestApp.Models;

namespace TestApp.Master_Details
{
    [AutoMapTo(typeof(Item))]
    public class ItemInputDTO
    {
        public int Id { get; set; }
    }
}