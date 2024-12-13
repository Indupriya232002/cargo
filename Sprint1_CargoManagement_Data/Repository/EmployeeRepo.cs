using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.DataContext;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Data.Repository
{
    public class EmployeeRepo : IEmployeeRepo
    {
        CargoManagementDbContext _dbContext;
        public EmployeeRepo(CargoManagementDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public object AddEmployee(Employee employee)
        {
            _dbContext.employees.Add(employee);
            _dbContext.SaveChanges();
            return "Employee Added Succesfully";
        }

        public object DeleteEmployee(int employeeId)
        {
            var employee = _dbContext.employees.Find(employeeId);
            if (employee != null)
            {
                _dbContext.employees.Remove(employee);
                _dbContext.SaveChanges();
            }
            return "Employee deleted succesfully";
        }

        public IList<Employee> GetAllEmployees()
        {
            return _dbContext.employees.ToList();
        }

        public Employee GetEmployeeById(int employeeId)
        {
            return _dbContext.employees.Find(employeeId);
        }

        public object UpdateEmployee(Employee employee)
        {
            _dbContext.employees.Update(employee);
            _dbContext.SaveChanges();
            User user = new User() { UserName = employee.EmpName, Password = employee.EmpPwd };
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return "Employee Update successfully";
        }


    }
}

