using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sprint1_CargoManagement_Entity
{
    public  class Customer
    {
        [Key]
        public int CustId {  get; set; }
        public string CustName { get; set; }
        public long CustPhoneNo { get; set; }
        public string CustEmail { get; set; }
        public string CustPwd { get; set; }
        public string CustAddress {  get; set; }
        public string CustGender { get; set; }
        public int CustAge { get; set; }
       


    }
}
