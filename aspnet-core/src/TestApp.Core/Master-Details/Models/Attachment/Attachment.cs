using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TestApp.Master_Details.Models.Attachment
{
    public class Attachment : FullAuditedEntity<int>
    {
        public string FileName { get; set; }
        public byte[] File { get; set; }

        public int OrderId { get; set; }

    }
}
