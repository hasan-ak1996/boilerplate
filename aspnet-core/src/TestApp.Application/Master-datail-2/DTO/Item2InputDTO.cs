using Abp.AutoMapper;
using TestApp.Models;

namespace TestApp.Master_datail_2
{
    [AutoMapTo(typeof(Item))]
    public class Item2InputDTO
    {
        public int Id { get; set; }
    }
}