using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.Repository;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Business.Services
{
    public class AccessPassService
    {
        IAccessPassRepo _accessPassRepo;
        public AccessPassService(IAccessPassRepo accessPassRepo)
        {
            _accessPassRepo = accessPassRepo;
        }


        public AccessPass CreateAccessPass(AccessPass accessPass)
        {

            return _accessPassRepo.CreateAccessPass(accessPass);

        }
        public List<AccessPass> GetAllAccessPasses()
        {

            return _accessPassRepo.GetAllAccessPasses();


        }
        public object UpdateAccessPass(AccessPass accesspass)
        {
            return _accessPassRepo.UpdateAccessPass(accesspass);
        }
        public object DeleteAccessPassById(int id)
        {
            return _accessPassRepo.DeleteAccessPassById(id);
        }
        public string GenerateUniqueGateAccess()
        {
            return Guid.NewGuid().ToString("N");
        }


    }
}

