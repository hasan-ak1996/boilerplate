using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TestApp.Master_Details
{
    public interface IItemAppService : IApplicationService
    {
        List<GetItemOutputDTO> GetAllItems();
        void CreateItem(CreateItemInputDTO input);
        void UpdateItem(UpdateItemInputDTO input);
        void DeleteItem(DeleteItemInputDTO input);
        GetItemOutputDTO GetItemById(ItemInputDTO input);
    }
}
