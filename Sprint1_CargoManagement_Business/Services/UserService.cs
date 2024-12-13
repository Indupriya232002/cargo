using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.Repository;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Business.Services
{
    public class UserService
    {
        IUserRepo _userRepo;
        public UserService(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public string Login(User user)
        {
            return _userRepo.Login(user);
        }

        public object SignUp(User user) 
        {
            return _userRepo.SignUp(user);
        }

    }
}
