using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Data.Repository
{
    public interface ICargoOrderDetailsRepo
    {
        CargoOrderDetails? AddCargoOrderDetails(CargoOrderDetails orderDetails);
        List<CargoOrderDetails> GetAllCargoOrderDetails();
        object UpdateCargoOrderDetails(CargoOrderDetails cargoOrderDetails);
       // CargoOrderDetails DeleteCargoOrderDetails(CargoOrderDetails cargoOrderDetails);
        object SearchCargoOrderDetailsById(int id);
        object DeleteCargoOrderDetailsById(int id);
        //object UpdateCargoOrderDetailsById(int id);
    }
}
