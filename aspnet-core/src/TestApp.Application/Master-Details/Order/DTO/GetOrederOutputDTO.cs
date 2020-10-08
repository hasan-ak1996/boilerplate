using System;
using System.Collections.Generic;
using System.Text;
using TestApp.Models;

namespace TestApp.Master_Details.Order.DTO
{
    public class GetOrederOutputDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string OrderNo { get; set; }
        public DateTime OrderDate { get; set; }
        public string EmpolyeeName { get; set; }
        public decimal TotalPrice { get; set; }
        public List<Item> Items { get; set; }
    }
}
