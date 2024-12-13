using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Data.Repository
{
    public interface ICargoOrderRepo
    {
        List<CargoOrder>  GetCargoOrderByAddress(string address);
        List<CargoOrder> GetAllCargoOrders();
        List<CargoOrder> GetCargoOrderByStatus(string status);
        object UpdateCargoOrder(CargoOrder cargoOrder);
        CargoOrder CreateANewCargoOrder(CargoOrder cargoOrder);
        object DeleteCargoOrderById(int orderId);
        double CalculateCargoPrice(double weight, double distance, string cargoType);

      
    }
}
