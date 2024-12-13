using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Data.Repository
{
    public interface IAccessPassRepo
    {
        List<AccessPass> GetAllAccessPasses();
        object DeleteAccessPassById(int id);
        AccessPass CreateAccessPass(AccessPass accessPass);
        object UpdateAccessPass(AccessPass accesspass);
    }
}
