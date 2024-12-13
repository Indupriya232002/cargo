using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.DataContext;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Data.Repository
{
    public class CargoTypeRepo : ICargoTypeRepo
    {
        CargoManagementDbContext _dbContext;
        public CargoTypeRepo(CargoManagementDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public object AddCargo(CargoType cargoType)
        {
            _dbContext.cargoTypes.Add(cargoType);
            _dbContext.SaveChanges();
            return "CargoType Added successfully";
        }

        public CargoType CargoTypeId(int cargoTypeId)
        {
            return _dbContext.cargoTypes.Find(cargoTypeId);
        }


        public object DeleteCargo(int cargoTypeId)
        {
            var cargotype = _dbContext.cargoTypes.Find(cargoTypeId);
            if (cargotype != null)
            {
                _dbContext.cargoTypes.Remove(cargotype);
                _dbContext.SaveChanges();
            }
            return "cargotype deleted succesfully";
        }

        public IList<CargoType> GetAll()
        {
            return _dbContext.cargoTypes.ToList();
        }

        public object UpdateCargoType(CargoType cargoType)
        {
            _dbContext.cargoTypes.Update(cargoType);
            _dbContext.SaveChanges();
            return "cargotype Update successfully";
        }
    }
}
