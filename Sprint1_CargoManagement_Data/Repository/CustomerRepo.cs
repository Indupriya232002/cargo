using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sprint1_CargoManagement_Data.DataContext;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Data.Repository
{
   
    public class CustomerRepo : ICustomerRepo
    {
        CargoManagementDbContext _dbcontext;

        public CustomerRepo(CargoManagementDbContext cargoMgmt)
        {

            _dbcontext = cargoMgmt;  //obj from container
        }
        public Customer AddCustomer(Customer customer)
        {
           
            _dbcontext.customers.Add(customer);
            _dbcontext.SaveChanges();
            User user = new User() { UserName = customer.CustName, Password = customer.CustPwd };
            _dbcontext.users.Add(user);
            _dbcontext.SaveChanges();
            return customer;
        }

        public object DeleteCustomerById(int id)
        {
            var order = _dbcontext.customers.Find(id);
            if (order != null)
            {
                _dbcontext.customers.Remove(order);
                _dbcontext.SaveChanges();
            }
            return "Customer deleted Successfully..!";
        }

        public List<Customer> GetAllCustomers()
        {
            return _dbcontext.customers.ToList();
        }

        public Customer GetCustomerById(int id)
        {
            return _dbcontext.customers.Find(id);
        }

        public List<Customer> SearchForCustomers(string searchTerm)
        {
            var customers = _dbcontext.customers
                            .Where(c => c.CustName.Contains(searchTerm) || c.CustEmail.Contains(searchTerm)).ToList();

            return customers;
        }

        public object UpdateCustomer(Customer customer)
        {
            _dbcontext.customers.Update(customer);
            _dbcontext.SaveChanges();
            return "Customer updated succesfully";
        }
    }
}
