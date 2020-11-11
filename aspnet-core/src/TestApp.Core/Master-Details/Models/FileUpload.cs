using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace TestApp.Master_Details.Models
{
    public class FileUpload
    {
        public IFormFile file { get; set; }
        public string Order { get; set; }
    }
}
