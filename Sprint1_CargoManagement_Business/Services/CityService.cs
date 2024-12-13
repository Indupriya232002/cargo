using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.Repository;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Business.Services
{
    public class CityService
    {
        ICityRepo _cityRepo;
        public CityService(ICityRepo cityRepo)
        {
            _cityRepo = cityRepo;
        }

        public City AddCity(City city)
        {
            return _cityRepo.AddCity(city);
        }

        public List<City> GetAll()
        {
            return _cityRepo.GetAll();
        }

        public City GetCityById(int id)
        {
            return _cityRepo.GetCityById(id);


        }
        public object Update(City city)
        {
            return _cityRepo.Update(city);
        }

        public object Delete(int id)
        {
            return _cityRepo.Delete(id);
        }
    }
}

