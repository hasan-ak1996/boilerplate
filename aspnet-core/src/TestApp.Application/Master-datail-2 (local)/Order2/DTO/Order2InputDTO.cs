using Abp.AutoMapper;
using TestApp.Models;

namespace TestApp.Master_datail_2.Order2
{
    [AutoMapTo(typeof(Order))]
    public class Order2InputDTO
    {
        public int Id { get; set; }
    }
}