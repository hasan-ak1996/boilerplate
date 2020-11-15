using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TestApp.Master_Details.Models.Attachment
{
    public interface IAttachmentManager
    {
        Task CreateFile(Attachment entity);
        Task UpdateOrder(Attachment entity);
        Task<Attachment> GetOrderById(int id);
    }
}
