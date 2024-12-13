import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customerregistration',
  templateUrl: './customerregistration.component.html',
  styleUrl: './customerregistration.component.css'
})
export class CustomerregistrationComponent { 
  customer:Customer={
    custId : 0,
    custName : "",
    custPhoneNo:null,
    custEmail:"",
    custPwd:"",
    custAddress:"",
    custGender:"",
    custAge:0
   }

   customerList= new Array<object>();
   customerSearchList: Customer[] = [];
   custList :  Customer[]= [];
   isModalOpen = false;
   selectedCustomer: Customer = new Customer();

   filtercustList : Customer[]= [];
   searchCustomer = "";

   custId = false;
   custName = false;
   custPhoneNo = false;
   custEmail = false;
   custPwd = false;
   custAddress = false;
   custGender = false;
   custAge = false;

   errorMessage : string = "";
   showEmailError: boolean = false;
  addCusPasswordErrorMessage: string="";
  addCusEmailErrorMessage: string="";
  addCusPhoneErrorMessage: string="";

 constructor(private customerservice:CustomerService,private router: Router)
 {

 }

  ngOnInit(): void {
    this.getAllCustomers();
    this.resetForm();
  
  }

  resetForm() {
    this.customer = {}; 
    this.custName = false;
    this.custPhoneNo = false;
    this.custEmail = false;
    this.custPwd = false;
    this.custAddress = false;
    this.custGender = false;
    this.custAge = false;
   }

  validatePhoneNumber(phoneNumber: any): boolean {
    return phoneNumber.toString().length === 10;
  }

  validateEmailFormat(email: any): boolean {
    const emailRegex = /^[a-z0-9._%+-]+@gmail\.com$/;
    return emailRegex.test(email);
  }

  validatePassword(password: any): boolean {
    if (password.length < 7) {
      return false;
    } 
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharacters.test(password)) {
      return false;
    }
    return true;
  }

  getAllCustomers()
  {
    this.customerservice.getAllCustomers().subscribe({
      next:(response) =>{
        this.custList = response;
        this.filtercustList = this.custList;
      },
      error:(error)=>
      {
        Swal.fire({
          icon: 'error',
          title: 'Error....!!!',
          showConfirmButton: true,
        }); 
      }
    });
  }

  addCustomer()
  {
  this.addCusPasswordErrorMessage='',
  this.addCusEmailErrorMessage='',
  this.addCusPhoneErrorMessage = '';
   this.custId = false;
   this.custName = false;
   this.custPhoneNo = false;
   this.custEmail = false;
   this.custPwd = false;
   this.custAddress = false;
   this.custGender = false;
   this.custAge = false;

    if (!this.customer.custName || this.customer.custName.trim() === '') {
      this.custName = true;
      this.errorMessage = "Name is required.";
    }
    if (!this.customer.custEmail ) {
      this.custEmail = true;
      this.addCusEmailErrorMessage = "Email is required.";
    }else if (!this.validateEmailFormat( this.customer.custEmail)) {
      this.custEmail = true;
      this.customer.custEmail= '';
      this.addCusEmailErrorMessage = "Please enter a valid email address in lowercase ending with '@gmail.com'.";
    }
    if (!this.customer.custPwd) {
      this.custPwd = true;
      this.addCusPasswordErrorMessage = "Password is required.";
    }
    else if (!this.validatePassword(this.customer.custPwd)) {
      this.custPwd = true;
      this.customer.custPwd = '';
      this.addCusPasswordErrorMessage = "Password must be at least 7 characters along with one special character.";
    }
    if (!this.customer.custPhoneNo || isNaN(this.customer.custPhoneNo)) {
      this.custPhoneNo = true;
      this.addCusPhoneErrorMessage = "Phone Number is required.";
    }
    else if (!this.validatePhoneNumber( this.customer.custPhoneNo )) {
      this.custPhoneNo = true;
      this.customer.custPhoneNo = '';
      this.addCusPhoneErrorMessage = "Phone Number must be 10 digits.";
    }
    if (!this.customer.custAddress || this.customer.custAddress.trim() === '') {
      this.custAddress =  true;
      this.errorMessage = "Address is required.";
    }
    if (!this.customer.custAge) {
      this.custAge = true;
      this.errorMessage = "Age is required.";
    }
    if (!this.customer.custGender || this.customer.custGender.trim() === '') {
      this.custGender= true;
      this.errorMessage = "Gender is required.";
    }
    if (this.custName || this.custEmail || this.custPwd || this.custPhoneNo || 
      this.custAddress ||  this.custAge || this.custGender) {
    return;
    }

    let isItemFound = false;

    this.custList.forEach((ele) => {
      let match = true;
      for (const key in ele) {
        if (key != 'custId' && ( key == "custEmail" || key == "custPhoneNo")) {
          if ((ele as any)[key] != (this.customer as any)[key]) {
            match = false;
            continue;
          }
          else{
            match = true;
            break;
          }
        }
      }

      if (match) {
        isItemFound = true;
        Swal.fire({
          icon: 'error',
          title: 'Customer Account already exists',
          showConfirmButton: true,
        }); 
        return;
      }
    });
    this.customer.role = "Customer";

    if(!isItemFound)
    {
      this.customerservice.addCustomer(this.customer).subscribe({
        next:(response) =>{
          Swal.fire({
            icon: 'success',
            title: 'Customer Registered Successfully!',
            showConfirmButton: true,
          }); 
          this.router.navigateByUrl('login');
          this.getAllCustomers();
          this.resetForm();
        },
        error:(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Error....!!!',
            showConfirmButton: true,
          }); 
        }
      });
    }
  }
  
}
