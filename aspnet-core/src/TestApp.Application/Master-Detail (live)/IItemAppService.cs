using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Models;

namespace TestApp.Master_Details
{
    public interface IItemAppService : IApplicationService
    {
        Task<List<GetItemOutputDTO>> GetAllItems();
        Task<Item> CreateItem(CreateItemInputDTO input);
        Task UpdateItem(GetItemOutputDTO input);
        Task DeleteItem(DeleteItemInputDTO input);
        Task<GetItemOutputDTO> GetItemById(ItemInputDTO input);
    }
}
