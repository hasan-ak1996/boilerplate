using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TestApp.Models;

namespace TestApp.Master_datail_2
{
    public interface IItem2AppService
    {
        Task<List<GetItem2OutputDTO>> GetAllItems();
        Task<Item> CreateItem(CreateItem2InputDTO input);
        Task UpdateItem(UpdateItem2InputDTO input);
        Task DeleteItem(DeleteItem2InputDTO input);
        Task<GetItem2OutputDTO> GetItemById(Item2InputDTO input);
    }
}
