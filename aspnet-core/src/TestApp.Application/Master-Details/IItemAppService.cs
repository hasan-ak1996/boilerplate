using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TestApp.Master_Details
{
    public interface IItemAppService : IApplicationService
    {
        IEnumerable<GetItemOutputDTO> GetAllItems();
        Task CreateItem(CreateItemInputDTO input);
        void UpdateItem(UpdateItemInputDTO input);
        void DeleteItem(DeleteItemInputDTO input);
        GetItemOutputDTO GetItemById(ItemInputDTO input);
    }
}
