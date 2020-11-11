using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TestApp.Web.Host.Controllers
{
    public class TestController1 : Controller
    {
        // GET: TestController1
        public ActionResult Index()
        {
            return View();
        }

        // GET: TestController1/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: TestController1/Create
        public ActionResult Create()
        {
            return View();
        }


        //Order order = JsonConvert.DeserializeObject<Order>(fileObj.order);
           // if(fileObj.file.Length > 0)
            //{
              //  using (var ms = new MemoryStream() ) {
                //    fileObj.file.CopyTo(ms);
                  //  var fileBytes = ms.ToArray();
       // order.File = fileBytes;
         //           _orderManager.CreateOrder(order);
           //         if(order.Id > 0)
             //       {
               //         return "Saved";
                 //   }
//                }
//}
//return "Faild";

// POST: TestController1/Create
[HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
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

        // GET: TestController1/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: TestController1/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
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

        // GET: TestController1/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: TestController1/Delete/5
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
