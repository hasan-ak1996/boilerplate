using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Text;

namespace TestApp.Models
{
    public class Order : FullAuditedEntity<int>
    {

        public string Name { get; set; }
        public string OrderNo { get; set; }
        public DateTime OrderDate { get; set; }
        public bool IsSubmit { get; set; }
        public string EmpolyeeName { get; set; }
        public decimal TotalPrice { get; set; }
        public List<Item> Items { get; set; }

    }
}
