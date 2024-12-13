using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprint1_CargoManagement_Entity
{
    public class CargoOrderDetails
    {
        [Key]
        public int OrderDetailsId { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double Weight { get; set; }

        [ForeignKey("CargoOrder")]
        public int OrderId { get; set; }
        public CargoOrder? CargoOrder { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public Product? Product { get; set; }

    }
}
