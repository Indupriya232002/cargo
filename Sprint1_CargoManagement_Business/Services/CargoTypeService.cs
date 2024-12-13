using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.Repository;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Business.Services
{
    public class CargoTypeService
    {
          ICargoTypeRepo _cargoTypeRepo;
            public CargoTypeService(ICargoTypeRepo cargoTypeRepo)
            {
                _cargoTypeRepo = cargoTypeRepo;
            }
            public object AddCargo(CargoType cargoType)
            {
                return _cargoTypeRepo.AddCargo(cargoType);
            }
            public CargoType CargoTypeId(int cargoTypeId)
            {
                return _cargoTypeRepo.CargoTypeId(cargoTypeId);
            }
            public object DeleteCargo(int cargoTypeId)
            {
                return _cargoTypeRepo.DeleteCargo(cargoTypeId);
            }

            public IList<CargoType> GetAll()
            {
                return _cargoTypeRepo.GetAll();
            }
            public object UpdateCargoType(CargoType cargoType)
            {
                return _cargoTypeRepo.UpdateCargoType(cargoType);
            }

        
    }
}
