using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.DataContext;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Data.Repository
{
    public class CityRepo : ICityRepo
    {
        CargoManagementDbContext _dbcontext;
        public CityRepo(CargoManagementDbContext cargoManagement)
        {
            _dbcontext = cargoManagement;
        }


        public City AddCity(City city)
        {
            _dbcontext.cities.Add(city);
            _dbcontext.SaveChanges();
            return city;
        }

        public List<City> GetAll()
        {
            return _dbcontext.cities.ToList();
        }

        public object Delete(int id)
        {
            var city = _dbcontext.cities.Find(id);
            if (city != null)
            {
                _dbcontext.cities.Remove(city);
                _dbcontext.SaveChanges();
            }
            return "Deleted succesfully";
        }
        public object Update(City city)
        {
            _dbcontext.cities.Update(city);
            _dbcontext.SaveChanges();
            return "City updated successfully";

        }

        public City GetCityById(int id)
        {
            return _dbcontext.cities.Find(id);
        }

    }
}
