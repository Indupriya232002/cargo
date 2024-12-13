using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.Repository;
using Sprint1_CargoManagement_Entity;
using Sprint1_CargoManagement_Business.Services;

namespace Sprint1_CargoManagement_Business.Services
{
    public class CargoOrderDetailsService
    {
        ICargoOrderDetailsRepo _orderDetailsRepo;
        public CargoOrderDetailsService(ICargoOrderDetailsRepo orderDetailsRepo)
        {
            _orderDetailsRepo = orderDetailsRepo;
        }

        public CargoOrderDetails? AddCargoOrderDetails(CargoOrderDetails orderDetails)
        {
            if (orderDetails != null)
            {
                return _orderDetailsRepo.AddCargoOrderDetails(orderDetails);

            }
            else
            {
                return null;
            }
        }

        public List<CargoOrderDetails> GetAllCargoOrderDetails()
        {
            return _orderDetailsRepo.GetAllCargoOrderDetails();
        }

        public object UpdateCargoOrderDetails(CargoOrderDetails orderDetails)
        {
            return _orderDetailsRepo.UpdateCargoOrderDetails(orderDetails);

        }

       /* public CargoOrderDetails? DeleteCargoOrderDetails(CargoOrderDetails orderDetails)
        {
            if (orderDetails != null)
            {
                return _orderDetailsRepo.DeleteCargoOrderDetails(orderDetails);
            }
            else
            {
                return null;
            }
        }*/

        public object? SearchCargoOrderDetailsById(int id)
        {

            if (id != 0 || id > 0)
            {
                return _orderDetailsRepo.SearchCargoOrderDetailsById(id);
            }
            else
            {
                return null;
            }
        }

       /* public object? UpdateCargoOrderDetailsById(int id)
        {
            if (id != 0 || id > 0)
            {
                return _orderDetailsRepo.UpdateCargoOrderDetailsById(id);
            }
            else
            {
                return null;
            }
        }*/

        public object? DeleteCargoOrderDetailsById(int id)
        {
            if (id != 0 || id > 0)
            {
                return _orderDetailsRepo.DeleteCargoOrderDetailsById(id);
            }
            else
            {
                return null;
            }
        }
    }
}
