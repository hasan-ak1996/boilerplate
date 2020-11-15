using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace TestApp.Master_Details.Models
{
    public class EditFile
    {
        public IFormFile file { get; set; }
        public int id { get; set; }
    }
}
