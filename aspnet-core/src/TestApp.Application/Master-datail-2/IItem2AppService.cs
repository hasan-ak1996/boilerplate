using System;
using System.Collections.Generic;
using System.Text;

namespace TestApp.Master_datail_2
{
    public interface IItem2AppService
    {
        List<GetItem2OutputDTO> GetAllItems();
        void CreateItem(CreateItem2InputDTO input);
        void UpdateItem(UpdateItem2InputDTO input);
        void DeleteItem(DeleteItem2InputDTO input);
        GetItem2OutputDTO GetItemById(Item2InputDTO input);
    }
}
