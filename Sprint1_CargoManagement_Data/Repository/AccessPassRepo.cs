using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.DataContext;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Data.Repository
{
    public class AccessPassRepo : IAccessPassRepo
    {
        CargoManagementDbContext _dbcontext;
        public AccessPassRepo(CargoManagementDbContext accesspass)
        {
            _dbcontext = accesspass;
        }
        public AccessPass CreateAccessPass(AccessPass accessPass)
        {
            _dbcontext.accessPasses.Add(accessPass);
            _dbcontext.SaveChanges();
            return accessPass;
        }

        public object DeleteAccessPassById(int id)
        {
            var ap = _dbcontext.accessPasses.Find(id);
            if (ap != null)
            {
                _dbcontext.accessPasses.Remove(ap);
                _dbcontext.SaveChanges();
            }
            return "AccessPass deleted successfully..!";
        }

        public List<AccessPass> GetAllAccessPasses()
        {
            return _dbcontext.accessPasses.ToList();
        }

        public object UpdateAccessPass(AccessPass accesspass)
        {
            _dbcontext.accessPasses.Update(accesspass);
            _dbcontext.SaveChanges();
            return "Access Pass updated succesfully";
        }
    }
}
