﻿using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Text;
using TestApp.Master_Details.Models.Attachment;

namespace TestApp.Models
{
    public class Order : FullAuditedEntity<int>
    {

        public string Name { get; set; }
        public string OrderNo { get; set; }
        public string OrderDate { get; set; }
        public bool IsSubmit { get; set; }
        public string EmpolyeeName { get; set; }
        public decimal TotalPrice { get; set; }
       //public byte[] File { get; set; }
       //public string FileName { get; set; }
        public virtual List<Attachment> Files { get; set; }
        public virtual List<Item> Items { get; set; }

    }
}
