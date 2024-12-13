using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.DataContext;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Data.Repository
{
    public class CargoOrderDetailsRepo : ICargoOrderDetailsRepo
    {
        CargoManagementDbContext _dbContext;
        public CargoOrderDetailsRepo(CargoManagementDbContext orderdetails)
        {
            _dbContext = orderdetails;
        }

        public CargoOrderDetails AddCargoOrderDetails(CargoOrderDetails cargoOrderdDetails)
        {
            _dbContext.cargoOrderDetails.Add(cargoOrderdDetails);
            _dbContext.SaveChanges();
            return cargoOrderdDetails;
        }

        public List<CargoOrderDetails> GetAllCargoOrderDetails()
        {
            return _dbContext.cargoOrderDetails.ToList();

        }

        public Object UpdateCargoOrderDetails(CargoOrderDetails cargoOrderDetails)
        {
            _dbContext.cargoOrderDetails.Update(cargoOrderDetails);
            _dbContext.SaveChanges();
            return "Details Updated Successfully..!";
        }

       /* public CargoOrderDetails DeleteCargoOrderDetails(CargoOrderDetails cargoOrderDetails)
        {
            _dbContext.cargoOrderDetails.Remove(cargoOrderDetails);
            _dbContext.SaveChanges();
            return cargoOrderDetails;
        }*/

        public object SearchCargoOrderDetailsById(int id)
        {
           return  _dbContext.cargoOrderDetails.Find(id);
          
        }

        public object DeleteCargoOrderDetailsById(int id)
        {
             CargoOrderDetails? cargoOrderDetails = _dbContext.cargoOrderDetails.Find(id);
            _dbContext.cargoOrderDetails.Remove(cargoOrderDetails);
            _dbContext.SaveChanges();
            return "Details deleted successfully..!";
        }


        /*public object UpdateCargoOrderDetailsById(int id)
        {
            CargoOrderDetails? deletebyid = _dbContext.cargoOrderDetails.Find(id);
            _dbContext.cargoOrderDetails.Update(deletebyid);
            return id;

        }*/
    }
}
