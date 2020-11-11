using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.AspNetCore.Mvc.Controllers;
using Abp.IO.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using TestApp.Master_Details.Models;
using TestApp.Models;

namespace TestApp.Web.Host.Controllers
{



    public class OrdersFileController : AbpController
    {
        private IWebHostEnvironment _hostingEnvironment;
        private readonly OrderManager _orderManager;

        public OrdersFileController(IWebHostEnvironment hostingEnvironment, OrderManager orderManager)
        {
            _hostingEnvironment = hostingEnvironment;
            _orderManager = orderManager;
        }
        // GET: OrdersFileController
        public ActionResult Index()
        {
            return Ok("ok");
        }

        // GET: OrdersFileController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: OrdersFileController/Create

        // POST: OrdersFileController/Create
        [HttpPost]
        public async Task<ActionResult> Create(FileUpload fileObj)
        {
            Order order = JsonConvert.DeserializeObject<Order>(fileObj.Order);
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            if (!Directory.Exists(uploads))
            {
                Directory.CreateDirectory(uploads);
            }
            if (fileObj.file != null)
            {
                var filePath = Path.Combine(uploads, fileObj.file.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await fileObj.file.CopyToAsync(fileStream);
                    using (var ms = new MemoryStream())
                    {
                        fileObj.file.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        order.File = fileBytes;
                        order.FileName = fileObj.file.FileName;
                    }
                         
                   
                }
            }
            order = await _orderManager.CreateOrder(order);
            return Ok(order);
        }



        [HttpGet]
        public async Task<ActionResult> Download(string fileName)
        {
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            var filePath = Path.Combine(uploads, fileName);
            if (!System.IO.File.Exists(filePath))
                return NotFound();
            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return File(memory, GetContentType(filePath), fileName);
        }


        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }


        // GET: OrdersFileController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: OrdersFileController/Edit
        [HttpPost]
        public async Task<ActionResult> Edit(FileUpload fileObj)
        {
            Order order = JsonConvert.DeserializeObject<Order>(fileObj.Order);
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            if (fileObj.file != null)
            {
                var filePath = Path.Combine(uploads, fileObj.file.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await fileObj.file.CopyToAsync(fileStream);
                    using (var ms = new MemoryStream())
                    {
                        fileObj.file.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        order.File = fileBytes;
                        order.FileName = fileObj.file.FileName;
                        
                    }
                }
            }
            await _orderManager.UpdateOrder(order);


            return Ok("ok");
        }

        // GET: OrdersFileController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: OrdersFileController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
