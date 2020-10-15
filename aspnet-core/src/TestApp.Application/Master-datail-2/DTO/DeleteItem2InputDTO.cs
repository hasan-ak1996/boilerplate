using Abp.AutoMapper;
using System;
using TestApp.Models;

namespace TestApp.Master_datail_2
{
    [AutoMapTo(typeof(Item))]
    public class DeleteItem2InputDTO
    {
        public int Id { get; set; }


        public DateTime? DeletionTime { get; set; }
    }
}