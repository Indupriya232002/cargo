using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.Repository;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Business.Services
{
    public class EmployeeService
    {
        IEmployeeRepo _empRepo;
        public EmployeeService(IEmployeeRepo empRepo)
        {
            _empRepo = empRepo;
        }

        public Employee GetEmployeeById(int employeeId)
        {
            return _empRepo.GetEmployeeById(employeeId);
        }

        public IList<Employee> GetAllEmployees()
        {
            return _empRepo.GetAllEmployees();
        }

        public object AddEmployee(Employee employee)
        {
            return _empRepo.AddEmployee(employee);
        }

        public object DeleteEmployee(int employeeId)
        {
            return _empRepo.DeleteEmployee(employeeId);
        }

        public object UpdateEmployee(Employee employee)
        {
            return _empRepo.UpdateEmployee(employee);
        }
    }
}

