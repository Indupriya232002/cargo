import { Component, ElementRef, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { Router } from '@angular/router';
import { CargoTypeService } from '../../services/cargo-type.service';
import { CargoType } from '../../models/cargo-type.model';
import { CargoOrder } from '../../models/cargo-order.model';
import { CargoOrderService } from '../../services/cargo-order.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  @ViewChild('AddcustomerModal')AddcustomerModal!: ElementRef;
  @ViewChild('cargobookingModal')cargobookingModal!: ElementRef;
  @ViewChild('editcustomerModal')editcustomerModal!: ElementRef;
  @ViewChild('editorderModal')editorderModal!: ElementRef;

  updateBtn?:boolean=false
  deleteBtn?:boolean=false
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

   cargoOrder:CargoOrder={
    orderId: 0,
    cargoType : "",
    source : "",
    destination : "",
    cargoOrderWeight : 0,
    orderStatus : "",
    address :"",
    custId: 1032,
    empId : 1009,
    cityId : 1
   };
   

   cargoOrderList : CargoOrder[] = [];
   customerList= new Array<object>();
   customerSearchList: Customer[] = [];
   custList :  Customer[]= [];
   isModalOpen = false;
   selectedCustomer: Customer = new Customer();
   filteredEmployees: Customer[] = [];
   searchQuery: string = '';
   selectedCargoOrder: CargoOrder = new CargoOrder();

   filterCargoTypeList : CargoOrder[] = [];
   searchCargo = "";

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

   ValidationPickUpDate = false;
   ValidationdeliveryDate =  false;
   ValidationcargoType = false;
   Validationsource = false;
   Validationdestination = false;
   ValidationcargoOrderWeight = false;
   validationOrderStatus = false;
   validationAddress = false;

   updateValidationPickUpDate = false;
   updateValidationdeliveryDate =  false;
   updateValidationseconddeliveryDate =  false;
   updateValidationcargoType = false;
   updateValidationsource = false;
   updateValidationdestination = false;
   updateValidationcargoOrderWeight = false;
   updatevalidationOrderStatus = false;
   updatevalidationAddress = false;

   updateCustId = false;
   updateCustName = false;
   updateCustPhoneNo = false;
   updateCustEmail = false;
   updateCustPwd = false;
   updateCustAddress = false;
   updateCustGender = false;
   updateCustAge = false;

   updateCusPasswordErrorMessage: string="";
   updateCusEmailErrorMessage: string="";
   updateCusPhoneErrorMessage: string="";

   showEmailError: boolean = false;
   errorMessage : string = "";
   username=String;
   userid:number=0;
   isLoggedIn = false;
   private emailInputSubject = new Subject<string>();

    constructor(private customerservice:CustomerService,private router: Router,
    private cargoorderservice:CargoOrderService,private storageService: StorageService)
    {
    }

    ngOnInit() {
      this.getAllCustomers();
      this.resetForm();
      this.getAllCargoOrders();
    }

    openEditModal(cargoOrder:CargoOrder) {
      this.selectedCargoOrder = cargoOrder;
      this.selectedCargoOrder.deliveryDate =  this.selectedCargoOrder.deliveryDate.split('T')[0];
      this.selectedCargoOrder.pickUpDate =  this.selectedCargoOrder.pickUpDate.split('T')[0];
    }
  
    openEditModalForCustomer(customer:Customer) {
      this.selectedCustomer = customer;
    }
  

    resetForm() {
      this.customer = {}; 
      this.cargoOrder = new CargoOrder();
      this.custName = false;
      this.custPhoneNo = false;
      this.custEmail = false;
      this.custPwd = false;
      this.custAddress = false;
      this.custGender = false;
      this.custAge = false;
      this.ValidationPickUpDate = false;
      this.ValidationdeliveryDate =  false;
      this.ValidationcargoType = false;
      this.Validationsource = false;
      this.Validationdestination = false;
      this.ValidationcargoOrderWeight = false;
      this.validationOrderStatus = false;
      this.validationAddress = false;
      this.showEmailError = false;
      this.updateCustId = false;
      this.updateCustName = false;
      this.updateCustPhoneNo = false;
      this.updateCustEmail = false;
      this.updateCustPwd = false;
      this.updateCustAddress = false;
      this.updateCustGender = false;
      this.updateCustAge = false;
      this.updateValidationPickUpDate = false;
      this.updateValidationdeliveryDate =  false;
      this.updateValidationcargoType = false;
      this.updateValidationsource = false;
      this.updateValidationdestination = false;
      this.updateValidationcargoOrderWeight = false;
      this.updatevalidationOrderStatus = false;
      this.updatevalidationAddress = false;
      this.updateValidationseconddeliveryDate = false;
    }
  
    redirectToHomePage() {
      this.router.navigateByUrl('/adminhome');
    }

    validateEmailFormat(email: any): boolean {
      const emailRegex = /^[a-z0-9._%+-]+@gmail\.com$/;
      return emailRegex.test(email);
    }

    onEmailInputChange(value:any) {
      this.emailInputSubject.next(value);
    }
  
    validatePhoneNumber(phoneNumber: any): boolean {
      return phoneNumber.toString().length === 10;
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

    addCustomer()
    {
      if (!this.customer.custName || this.customer.custName.trim() === '') {
        this.custName = true;
        return;
      }
      if (!this.customer.custPhoneNo || isNaN(this.customer.custPhoneNo)) {
        this.custPhoneNo = true;
        this.errorMessage = "Phone Number is required";
        return;
      }
      if(!this.validatePhoneNumber(this.customer.custPhoneNo))
      {
        this.customer.custPhoneNo = null;
        this.custPhoneNo = true;
        this.errorMessage = "Phone Number must be 10 digits";
        return;
      }
      if (!this.customer.custAddress || this.customer.custAddress.trim() === '') {
        this.custAddress =  true;
        return;
      }
      if (!this.customer.custEmail ) {
        this.custEmail = true;
        this.errorMessage = "Email is required.";
        return;
      }
      if(!this.validateEmailFormat(this.customer.custEmail))
      {
        this.customer.custEmail = "";
        this.custEmail = true;
        this.errorMessage = "Please enter a valid email address in lowercase ending with '@gmail.com'.";
        return;
      }
      if (!this.customer.custPwd) {
        this.custPwd = true;
        this.errorMessage = "Password is required";
        return;
      }
      if(!this.validatePassword(this.customer.custPwd))
      {
        this.customer.custPwd = "";
        this.custPwd = true;
        this.errorMessage = "Password must be  atleast 7 characters along with one special character";
        return;
      }
      if (!this.customer.custAge) {
        this.custAge = true;
        return;
      }
      if (!this.customer.custGender || this.customer.custGender.trim() === '') {
        this.custGender= true;
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
              title: 'Customer added.....!',
              showConfirmButton: true,
            }); 
            this.getAllCustomers();
            this.closeModalForCustomer();
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
   
    getAllCustomers()
    {
      this.customerservice.getAllCustomers().subscribe({
        next:(response) =>{
          this.custList = response;
          let customerName =  window.localStorage.getItem('userName');
          this.custList = this.custList.filter(x => x.custName == customerName);
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

    executeCustomerFunctionOnConfirm(id: number) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete the customer',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteCustomerById(id);
        }
      });
    }

    deleteCustomerById(id:number)
    {
      this.customerservice.deleteCustomerById(id).subscribe({
        next:(response) =>{
          Swal.fire({
            icon: 'success',
            title: 'Customer deleted successfully.......!',
            showConfirmButton: true,
          }); 
          this.getAllCustomers();
          this.customer = response;
          this.deleteBtn=true;
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

  getCustomerById(id:number):void{
    this.customerservice.getCustomerById(id).subscribe({
      next:(response)=>{
        this.customer=response;
        this.updateBtn=true;
      },
      error:(error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Inavlid Input',
          showConfirmButton: true,
        }); 
      }
    });
   }

   searchForCustomers(keyword:string){
    this.customerservice.searchForCustomers(keyword).subscribe({
      next:(response)=>{
        this.custList = response;
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

   updateCustomer(){
    this.updateCusPasswordErrorMessage='',
    this.updateCusEmailErrorMessage='',
    this.updateCusPhoneErrorMessage = '';
    this.updateCustId = false;
    this.updateCustName = false;
    this.updateCustPhoneNo = false;
    this.updateCustEmail = false;
    this.updateCustPwd = false;
    this.updateCustAddress = false;
    this.updateCustGender = false;
    this.updateCustAge = false;
    if (!this.selectedCustomer.custId) {
      this.updateCustId = true;
      this.errorMessage = "Id is required.";
    }
     if (! this.selectedCustomer.custName||  this.selectedCustomer.custName.trim() === '') {
      this.updateCustName = true;
      this.errorMessage = "Name is required.";
    }
    if (! this.selectedCustomer.custEmail) {
      this.updateCustEmail = true;
      this.updateCusEmailErrorMessage = "Email is required.";
    } else if (!this.validateEmailFormat( this.selectedCustomer.custEmail)) {
      this.updateCustEmail = true;
      this.selectedCustomer.custEmail= '';
      this.updateCusEmailErrorMessage = "Please enter a valid email address in lowercase ending with '@gmail.com'.";
    }
    if (! this.selectedCustomer.custGender ||  this.selectedCustomer.custGender.trim() === '') {
      this.updateCustGender = true;
      this.errorMessage = "Gender is required.";
    }
    if (! this.selectedCustomer.custPhoneNo || isNaN( this.selectedCustomer.custPhoneNo)) {
      this.updateCustPhoneNo = true;
      this.updateCusPhoneErrorMessage = "Phone Number is required.";
    } else if (!this.validatePhoneNumber( this.selectedCustomer.custPhoneNo)) {
      this.updateCustPhoneNo = true;
      this.selectedCustomer.custPhoneNo= '';
      this.updateCusPhoneErrorMessage = "Phone Number must be 10 digits.";
    }
    if (!this.selectedCustomer.custPwd) {
      this.updateCustPwd = true;
      this.updateCusPasswordErrorMessage = "Password is required.";
    } else if (!this.validatePassword( this.selectedCustomer.custPwd)) {
      this.updateCustPwd = true;
      this.selectedCustomer.custPwd = '';
      this.updateCusPasswordErrorMessage = "Password must be at least 7 characters along with one special character.";
    }
    if (! this.selectedCustomer.custAddress ||  this.selectedCustomer.custAddress.trim() === '') {
      this.updateCustAddress = true;
      this.errorMessage = "Address is required.";
    }
    if (! this.selectedCustomer.custAge) {
      this.updateCustAge = true;
      this.errorMessage = "Age is required.";
    }
   
    if (this.updateCustId||this.updateCustName || this.updateCustEmail || this.updateCustAddress || this.updateCustPhoneNo || 
        this.updateCustPwd ||  this.updateCustAge || this.updateCustGender) {
      return;
    }
    this.customerservice.updateCustomer(this.selectedCustomer).subscribe({
      next:(response)=>{
        Swal.fire({
          icon: 'success',
          title: 'Customer  updated successfully....!',
          showConfirmButton: true,
        }); 
        this.getAllCustomers();
        this.resetForm(); 
        this.updateCuscloseModal();
      },
      error:(error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error occurred while updating customer',
          showConfirmButton: true,
        }); 
      }
    })
   }

   updateCuscloseModal() {
    const modal: HTMLElement = this.editcustomerModal.nativeElement as HTMLElement;
      if (modal) {
      modal.style.display =  "none";
      modal.classList.remove('show');
        const backdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (backdrop) {
        backdrop.remove();
      }
      document.body.classList.remove('modal-open');
    }
  }

  updateOrdercloseModal() {
    const modal: HTMLElement = this.editorderModal.nativeElement as HTMLElement;
      if (modal) {
      modal.style.display =  "none";
      modal.classList.remove('show');
        const backdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (backdrop) {
        backdrop.remove();
      }
      document.body.classList.remove('modal-open');
    }
  }

   createANewCargoOrder()
    {
      this.updateValidationseconddeliveryDate = false;
      this.ValidationPickUpDate = false;
      this.ValidationdeliveryDate =  false;
      this.ValidationcargoType = false;
      this.Validationsource = false;
      this.Validationdestination = false;
      this.ValidationcargoOrderWeight = false;
      this.validationOrderStatus = false;
      this.validationAddress = false;
      if (!this.cargoOrder.cargoType || this.cargoOrder.cargoType === '') {
        this.ValidationcargoType = true;
        this.errorMessage = "Cargo Type is required.";
      }
      if (!this.cargoOrder.source) {
        this.Validationsource = true;
        this.errorMessage = "source is required.";
      }
      if (!this.cargoOrder.destination) {
        this.Validationdestination =  true;
        this.errorMessage = "destination is required.";
        ;
      }
      if (!this.cargoOrder.address) {
        this.validationAddress = true;
        this.errorMessage = "address is required.";
      }
      if (!this.cargoOrder.orderStatus) {
        this.validationOrderStatus =  true;
        this.errorMessage = "orderStatus is required.";
      }
      if (!this.cargoOrder.cargoOrderWeight) {
        this.ValidationcargoOrderWeight =  true;
        this.errorMessage = "Cargo Order Weight is required.";
      }
      if (!this.cargoOrder.pickUpDate ) {
        this.ValidationPickUpDate = true;
        this.errorMessage = "pickUpDate is required.";
      }
      if (!this.cargoOrder.deliveryDate) {
        this.ValidationdeliveryDate = true;
        this.errorMessage = "deliveryDate is required.";
      }
      if(this.cargoOrder.pickUpDate >= this.cargoOrder.deliveryDate) {
        this.updateValidationseconddeliveryDate = true; 
      }
      if (this.ValidationcargoType || this.Validationsource || this.Validationdestination || this.validationAddress || 
        this.validationOrderStatus || this.ValidationcargoOrderWeight || this.ValidationPickUpDate || this.ValidationdeliveryDate||this.updateValidationseconddeliveryDate) {
      return;
    }
     console.log('cityid',this.cargoOrder.cityId)
      this.cargoorderservice.createANewCargoOrder(this.cargoOrder).subscribe({
        next:(response) =>{
          Swal.fire({
            icon: 'success',
            title: 'Order added....!!!',
            showConfirmButton: true,
          }); 
          this.getAllCargoOrders();
          this.closeModalForCargo();
          this.resetForm();
        },
        error:(error)=>{
          console.log('error***********',error);
          Swal.fire({
            icon: 'error',
            title: 'Error....!!!',
            showConfirmButton: true,
          }); 
        }
      });
 
    }
 
    getAllCargoOrders()
    {
      this.cargoorderservice.getAllCargoOrders().subscribe({
        next:(response) =>{
          this.cargoOrderList = response;
          this.filterCargoTypeList = this.cargoOrderList;
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

    updateCargoOrder()
    {
      this.updateValidationseconddeliveryDate = false;
      this.updateValidationPickUpDate = false;
      this.updateValidationdeliveryDate =  false;
      this.updateValidationcargoType = false;
      this.updateValidationsource = false;
      this.updateValidationdestination = false;
      this.updateValidationcargoOrderWeight = false;
      this.updatevalidationOrderStatus = false;
      this.updatevalidationAddress = false;
       if (!this.selectedCargoOrder.cargoType || this.selectedCargoOrder.cargoType === '') {
        this.updateValidationcargoType = true;
        this.errorMessage = "Cargo Type is required.";
      }
      if (!this.selectedCargoOrder.source) {
        this.updateValidationsource = true;
        this.errorMessage = "source is required.";
      }
      if (!this.selectedCargoOrder.destination) {
        this.updateValidationdestination =  true;
        this.errorMessage = "destination is required.";
        ;
      }
      if (!this.selectedCargoOrder.address) {
        this.updatevalidationAddress = true;
        this.errorMessage = "address is required.";
      }
      if (!this.selectedCargoOrder.orderStatus) {
        this.updatevalidationOrderStatus =  true;
        this.errorMessage = "orderStatus is required.";
      }
      if (!this.selectedCargoOrder.cargoOrderWeight) {
        this.updateValidationcargoOrderWeight =  true;
        this.errorMessage = "Cargo Order Weight is required.";
      }
      if (!this.selectedCargoOrder.pickUpDate ) {
        this.updateValidationPickUpDate = true;
        this.errorMessage = "pickUpDate is required.";
      }
      if (!this.selectedCargoOrder.deliveryDate) {
        this.updateValidationdeliveryDate = true;
        this.errorMessage = "deliveryDate is required.";
      }
      if(this.selectedCargoOrder.pickUpDate >= this.selectedCargoOrder.deliveryDate) {
        this.updateValidationseconddeliveryDate = true; 
      }
      if (this.updateValidationcargoType || this.updateValidationsource || this.updateValidationdestination || this.updatevalidationAddress || 
        this.updatevalidationOrderStatus || this.updateValidationcargoOrderWeight || this.updateValidationPickUpDate || this.updateValidationdeliveryDate || this.updateValidationseconddeliveryDate) {
      return;
    } 

      this.cargoorderservice.updateCargoOrder(this.selectedCargoOrder).subscribe({
        next:(response)=>{
          Swal.fire({
            icon: 'success',
            title: 'Order details updated successfully...!',
            showConfirmButton: true,
          }); 
          this.getAllCargoOrders();
          this.updateOrdercloseModal();
          this.resetForm();
        },
        error:(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Inavlid Input..!!!',
            showConfirmButton: true,
          }); 
        }
      });
    }

    executeCargoOrderFunctionOnConfirm(id: number) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete the Cargo Order',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteCargoOrder(id);
        }
      });
    }
   
    deleteCargoOrder(id: number)
    {
      this.cargoorderservice.deleteCargoOrder(id).subscribe({
        next:(response)=>{
          Swal.fire({
            icon: 'success',
            title: 'Order Deleted Successfully...!',
            showConfirmButton: true,
          }); 
          this.getAllCargoOrders();
          this.cargoOrder=response;
          this.deleteBtn=true;
        },
        error:(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Invalid input..!!!',
            showConfirmButton: true,
          }); 
        }
      });
    }

    filterCargoType() {
      this.filterCargoTypeList = this.cargoOrderList.filter(cargo =>
        (cargo.cargoType && cargo.cargoType.toLowerCase().includes(this.searchCargo.toLowerCase())) ||
        (cargo.source && cargo.source.toLowerCase().includes(this.searchCargo.toLowerCase())) ||
        (cargo.destination && cargo.destination.toLowerCase().includes(this.searchCargo.toLowerCase())) ||
        (cargo.cargoOrderWeight && cargo.cargoOrderWeight.toString().includes(this.searchCargo.toLowerCase())) ||
        (cargo.orderStatus && cargo.orderStatus.toLowerCase().includes(this.searchCargo.toLowerCase())) ||
        (cargo.address && cargo.address.toLowerCase().includes(this.searchCargo.toLowerCase()))
      );   
     }

    filterCustomer() {
      this.filtercustList = this.custList.filter(cust =>
        (cust.custName && cust.custName.toLowerCase().includes(this.searchCustomer.toLowerCase())) ||
        (cust.custPhoneNo && cust.custPhoneNo.toString().includes(this.searchCustomer.toLowerCase())) ||
        (cust.custEmail && cust.custEmail.toLowerCase().includes(this.searchCustomer.toLowerCase())) ||
        (cust.custAddress && cust.custAddress.toLowerCase().includes(this.searchCustomer.toLowerCase())) ||
        (cust.custAge && cust.custAge.toString().includes(this.searchCustomer.toLowerCase()))    );
    }

    closeModalForCustomer() {
      const modal: HTMLElement = this.AddcustomerModal.nativeElement as HTMLElement;
    
      if (modal) {
        modal.style.display =  "none";
        modal.classList.remove('show');
    
        const backdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (backdrop) {
          backdrop.remove();
        }
        document.body.classList.remove('modal-open');
      }
    }
  
    closeModalForCargo() {
      const modal: HTMLElement = this.cargobookingModal.nativeElement as HTMLElement;
    
      if (modal) {
        modal.style.display =  "none";
        modal.classList.remove('show');
    
        const backdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (backdrop) {
          backdrop.remove();
        }
    
        document.body.classList.remove('modal-open');
      }
    }
  }


