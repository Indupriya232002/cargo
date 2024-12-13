using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprint1_CargoManagement_Entity
{
    public class CargoType
    {
        [Key]
        public int CargoTypeId { get; set; }
        public string CargoTypeName { get; set; }
        public int CargoWeight { get; set; }
        public int HandlingFee { get; set; }
    }
}
