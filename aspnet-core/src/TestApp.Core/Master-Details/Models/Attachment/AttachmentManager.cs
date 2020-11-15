using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TestApp.Master_Details.Models.Attachment
{
    public class AttachmentManager : IAttachmentManager
    {
        private readonly IRepository<Attachment> _attachmentRepository;

        public AttachmentManager(IRepository<Attachment> attachmentRepository)
        {
            _attachmentRepository = attachmentRepository;
        }
        public async Task CreateFile(Attachment entity)
        {
            await _attachmentRepository.InsertAsync(entity);
        }

        public async Task<Attachment> GetOrderById(int id)
        {
            return await _attachmentRepository.GetAsync(id);
        }

        public async Task UpdateOrder(Attachment entity)
        {
            await _attachmentRepository.UpdateAsync(entity);
        }
    }
}
