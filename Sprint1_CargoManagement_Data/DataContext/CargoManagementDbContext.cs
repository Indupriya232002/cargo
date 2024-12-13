using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sprint1_CargoManagement_Entity;

namespace Sprint1_CargoManagement_Data.DataContext
{
    public class CargoManagementDbContext : DbContext
    {
        public CargoManagementDbContext(DbContextOptions<CargoManagementDbContext> options) : base(options) { }

        public DbSet<City> cities { get; set; }
        public DbSet<CargoOrderDetails> cargoOrderDetails { get; set; }
        public DbSet<CargoOrder> cargoOrders {  get; set; }
        public DbSet<Customer> customers { get; set; }
        public DbSet<Employee> employees { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<CargoType> cargoTypes { get; set; }
        public DbSet<AccessPass> accessPasses { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<AccessPass>()
                .HasIndex(u => u.UniqueAccess)
                .IsUnique();
        }

    }
}
