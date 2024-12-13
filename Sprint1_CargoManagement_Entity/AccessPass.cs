using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprint1_CargoManagement_Entity
{
    public class AccessPass
    {
        [Key]
        public int AccessId { get; set; }
        public string? UniqueAccess { get; set; }
        public DateTime EntryTime { get; set; }
        public DateTime ExitTime { get; set; }
        public string TrukcId { get; set; }

        [ForeignKey("Employee")]
        public int EmpId { get; set; }
        public Employee? Employee { get; set; }


    }
}
