using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sprint1_CargoManagement_Data.DataContext;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Data.Repository
{
    public class CargoOrderRepo : ICargoOrderRepo
    {
        CargoManagementDbContext _dbcontext;
        public CargoOrderRepo(CargoManagementDbContext cargoMgmt)
        {

            _dbcontext = cargoMgmt;  //obj from container
        }
        public object DeleteCargoOrderById(int orderId)
        {
            var order = _dbcontext.cargoOrders.Find(orderId);
            if (order != null)
            {
                _dbcontext.cargoOrders.Remove(order);
                _dbcontext.SaveChanges();
            }
            return "Order Cancelled Successfully..!";
        }

        public CargoOrder CreateANewCargoOrder(CargoOrder cargoOrder)
        {
            _dbcontext.cargoOrders.Add(cargoOrder);
            _dbcontext.SaveChanges();
            return cargoOrder;
        }

        public List<CargoOrder> GetAllCargoOrders()
        {
            return _dbcontext.cargoOrders.ToList();
        }

        public List<CargoOrder> GetCargoOrderByAddress(string address)
        {
            return _dbcontext.cargoOrders.Where(o => o.Address == address).ToList();
        }
        public List<CargoOrder> GetCargoOrderByStatus(string status)
        {
            return _dbcontext.cargoOrders.Where(s => s.OrderStatus == status).ToList();
        }

        public object UpdateCargoOrder(CargoOrder cargoOrder)
        {
            _dbcontext.cargoOrders.Update(cargoOrder);
            _dbcontext.SaveChanges();
            return "Order updated succesfully";
        }

        public double CalculateCargoPrice(double weight, double distance, string cargoType)
        {
            double price = 0;
            return price;
        }
    }
}
