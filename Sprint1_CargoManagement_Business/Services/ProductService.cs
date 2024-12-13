using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sprint1_CargoManagement_Data.Repository;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Business.Services
{
    public class ProductService
    {
        IProductRepo _productRepo;
        private object _dbContext;

        public ProductService(IProductRepo productRepo)
        {
            _productRepo = productRepo;
        }
        public Product AddProduct(Product Product)
        {
            return _productRepo.AddProduct(Product);
        }

        public object UpdateProduct(Product product)
        {
            return _productRepo.UpdateProduct(product);

        }

        public object DeleteProductById(int id)
        {
            return _productRepo.DeleteProductById(id);
        }

        public Product GetProductById(int id)
        {
            return _productRepo.GetProductById(id);
        }

        public List<Product> GetProductByName(string name)
        {
            return _productRepo.GetProductByName(name);
        }

        public List<Product> GetAllProducts()
        {
            return _productRepo.GetAllProducts();
        }

    }
}
