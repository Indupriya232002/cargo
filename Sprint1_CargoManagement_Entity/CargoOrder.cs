using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprint1_CargoManagement_Entity
{
    public  class CargoOrder
    {
        [Key]
        public int OrderId { get; set; }
        public string OrderStatus { get; set; }
        public DateTime PickUpDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string CargoType { get; set; }
        public string Address { get; set; }
        public string source { get; set; }
        public string destination { get; set; } 
        public decimal CargoOrderWeight { get; set; }

        [ForeignKey("Customer")]
        public int CustId { get; set; }

        public Customer? Customer { get; set; }

        [ForeignKey("Employee")]
        public int EmpId { get; set; }
        public Employee? Employee { get; set; }

        [ForeignKey("City")]
        public int CityId { get; set; }
        public City? City { get; set; }

    }
}
