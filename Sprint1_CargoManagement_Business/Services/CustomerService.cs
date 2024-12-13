using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.Repository;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Business.Services
{
    public class CustomerService
    {
        ICustomerRepo _customerRepo;
        public CustomerService(ICustomerRepo customerRepo)
        {
            _customerRepo = customerRepo;
        }

        public Customer AddCustomer(Customer customer)
        {
            return _customerRepo.AddCustomer(customer);
        }

        public List<Customer> GetAllCustomers()
        {
            return _customerRepo.GetAllCustomers();
        }

        public object DeleteCustomerById(int id)
        {
            return _customerRepo.DeleteCustomerById(id);
        }

        public   Customer GetCustomerById(int id)
        {
            return _customerRepo.GetCustomerById(id);
        }
        public   List<Customer> SearchForCustomers(string searchTerm)
        {
            return _customerRepo.SearchForCustomers(searchTerm);
        }

        public   object UpdateCustomer(Customer customer)
        {
            return _customerRepo.UpdateCustomer(customer);
        }
    }
}
