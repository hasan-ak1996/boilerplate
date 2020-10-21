using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace TestApp.Master_datail_2.Order2.DTO
{
    public class PagedOrder2ResultRequestDto : PagedResultRequestDto
    {
        public override int MaxResultCount { get => base.MaxResultCount; set => base.MaxResultCount = value; }
        public override int SkipCount { get => base.SkipCount; set => base.SkipCount = value; }
    }
}
