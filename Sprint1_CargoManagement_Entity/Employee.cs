using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprint1_CargoManagement_Entity
{
    public class Employee
    {
        [Key]
        public int EmpId { get; set; }
        public string EmpName { get; set; }
        public long EmpPhoneNo { get; set; }
        public string EmpAddress { get; set; }
        public string EmpEmail { get; set; }
        public string EmpPwd { get; set; }
        public int EmpAge { get; set; }
        public string EmpRole { get; set; }
        public string EmpGender { get; set; }
        public double EmpSal {  get; set; }
      
    }
}
