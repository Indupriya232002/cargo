import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CargoType } from '../../models/cargo-type.model';
import { Customer } from '../../models/customer.model';
import { CargoTypeService } from '../../services/cargo-type.service';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from '../../services/storage.service';
import { Inputdata } from '../../models/inputdata.model';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  @ViewChild('addcargoModal')addcargoModal!: ElementRef;
  @ViewChild('editcustomerModal')editcustomerModal!: ElementRef;
  @ViewChild('updatecargoModal')updatecargoModal!: ElementRef;

  isAdmin?:boolean=false;
  isEmp?:boolean=false;
  isCust?:boolean=false;
  customer:Customer={
    custId : 0,
    custName : "",
    custPhoneNo:0,
    custEmail:"",
    custPwd:"",
    custAddress:"",
    custGender:"",
    custAge:0
   }
   deleteBtn?:boolean=false;
   updateBtn?:boolean=false;
   custList : Customer[] = []; 
   cutSearchList: Customer[] = [];
   selectedCustomer: Customer = new Customer();
   filteredCustomer: Customer[] = [];
   searchQuery: string = '';
   cargoTypeList : CargoType[] = [];
   selectedCargoType: CargoType = new CargoType()

   cargoType:CargoType ={
    cargoTypeId: 0,
    cargoTypeName: "",
    cargoWeight: 0,
    handlingFee: 0
  };
  errorMessage : string = "";

  cargoTypeId =  false;
  cargoTypeName = false;
  cargoWeight = false;
  handlingFee = false;

  updateCargoTypeId =  false;
  updateCargoTypeName = false;
  updateCargoWeight = false;
  updateHandlingFee = false;

  filtercustList : Customer[]= [];
  searchCustomer = "";

  filterCargoTypeList : CargoType[] = [];
  searchCargo = "";
  jsonData?:string
  blobData?:Inputdata
  
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
   isPasswordVisible: boolean = false; 
   private emailInputSubject = new Subject<string>();

    constructor(private customerservice:CustomerService,private router: Router,private cargotypeservice:CargoTypeService,private storageService:StorageService)
    {
    }

  ngOnInit()
  {
    this.resetForm();
    this.selectedCustomer = new Customer();
    this.getAllCustomers();
    this.getAll();

    const role=this.storageService.getUserRole();
      if(role=="Admin")
        this.isAdmin=true;
      if(role=="Employee")
        this.isEmp=true;
      if(role=="Customer")
        this.isCust=true;  
  }

  redirectToHomePage() {
    this.router.navigateByUrl('/adminhome');
  }

  resetForm() {
    this.customer = {}; 
    this.cargoType = {};
    this.cargoTypeName = false;
    this.cargoWeight = false;
    this.handlingFee = false;
    this.customer ={};
    this.cargoType = {};
    this.updateCustId = false;
    this.updateCustName = false;
    this.updateCustPhoneNo = false;
    this.updateCustEmail = false;
    this.updateCustPwd = false;
    this.updateCustAddress = false;
    this.updateCustGender = false;
    this.updateCustAge = false;
    this.updateCargoTypeId =  false;
    this.updateCargoTypeName = false;
    this.updateCargoWeight = false;
    this.updateHandlingFee = false; 
 
  }

  openEditModal(customer: Customer) {
    this.selectedCustomer = customer;
  }

  openEditModalForCargo(cargoType: CargoType) {
    this.selectedCargoType = cargoType;
  }

   addCustomer()
  {
    this.customerservice.addCustomer(this.customer).subscribe({
      next:(response) =>{
        Swal.fire({
          icon: 'success',
          title: 'Customer added successfully.......!',
          showConfirmButton: true,
        }); 
        this.getAllCustomers();
      },
      error:(error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Error....!',
          showConfirmButton: true,
        }); 
      }
    });
    this.jsonData =JSON.stringify(this.customer);
    this.blobData ={data:this.jsonData }
    this.storageService.sendDataToBlob(this.blobData).subscribe({
      next:(response)=>{
        console.log('Blob added with Order Details')
      },
      error:(error)=>{
        console.log(error);
      }
    })
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
          title: 'Error....!',
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
          title: 'Inavlid Input...!',
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
            title: 'Customer deleted successfully...!',
            showConfirmButton: true,
          });
          this.getAllCustomers();
          this.customer = response;
          this.deleteBtn=true;
        },
        error:(error)=>{
          Swal.fire({
            icon: 'error',
            title: 'Error....!',
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
          title: 'Error....!',
          showConfirmButton: true,
        });      }
    });
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

  togglePasswordVisibility(input: HTMLInputElement): void {
    this.isPasswordVisible = !this.isPasswordVisible; 
    input.type = this.isPasswordVisible ? 'text' : 'password'; 
  }
  openEditModalForCustomer(customer: Customer) {
    this.selectedCustomer = customer;
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

  addCargo()
  {
   this.cargoTypeId =  false;
   this.cargoTypeName = false;
   this.cargoWeight = false;
   this.handlingFee = false;
    if (!this.cargoType.cargoTypeName || this.cargoType.cargoTypeName.trim() === '') {
      this.cargoTypeName = true;
      this.errorMessage = "Cargo Type is required.";
    }
    if (!this.cargoType.cargoWeight || isNaN(this.cargoType.cargoWeight)) {
      this.cargoWeight = true;
      this.errorMessage = "Cargo Weight is required.";
    }
    if (!this.cargoType.handlingFee) {
      this.handlingFee =  true;
      this.errorMessage = "Handling Fee is required.";
    }
    if (this.cargoTypeName || this.cargoWeight || this.handlingFee) {
    return;
  }

  let isItemFound = false;

  this.cargoTypeList.forEach((ele) => {
    let match = true;
    for (const key in ele) {
      if (key != 'cargoTypeId' && ( key == "cargoTypeName")){
        if ((ele as any)[key] != (this.cargoType as any)[key]) {
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
        title: 'Cargo Type already exists',
        showConfirmButton: true,
      });  
      return;
    }
  });

  if(!isItemFound)
  {
    this.cargotypeservice.addCargo(this.cargoType).subscribe({
      next:(response) =>{
        Swal.fire({
          icon: 'success',
          title: 'CargoType added...........',
          showConfirmButton: true,
        }); 
        this.getAll();
        this.closeModalForCargo();
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
   
    this.jsonData =JSON.stringify(this.cargoType);
    this.blobData ={data:this.jsonData }
    this.storageService.sendDataToBlob(this.blobData).subscribe({
      next:(response)=>{
        console.log('Blob added with Order Details')
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

   getAll()
   {
     this.cargotypeservice.getAll().subscribe({
       next:(response) =>{
         this.cargoTypeList = response;
         this.filterCargoTypeList = this.cargoTypeList;
       },
       error:(error)=>
       {
        Swal.fire({
          icon: 'error',
          title: 'Error....!',
          showConfirmButton: true,
        });
       }
     });
   }

 
   executeCargoFunctionOnConfirm(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete the cargo',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCargo(id);
      }
    });
  }

   deleteCargo(id: number)
   {
     this.cargotypeservice.deleteCargo(id).subscribe({
       next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'cargoType deleted successfully',
          showConfirmButton: true,
        });
         this.getAll(); 
         this.cargoType=response;
       },
       error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error occurred while deleting cargotype..!',
          showConfirmButton: true,
        });
       }
     });
   }

   updateCargoType()
   {
     this.updateCargoTypeId =  false;
     this.updateCargoTypeName = false;
     this.updateCargoWeight = false;
     this.updateHandlingFee = false; 
     if (!this.selectedCargoType.cargoTypeName) {
       this.updateCargoTypeName = true;
       this.errorMessage = "Name is required.";
     }
     if (!this.selectedCargoType.cargoWeight) {
       this.updateCargoWeight = true;
       this.errorMessage = "Handling weight is required.";
     }
      if (! this.selectedCargoType.handlingFee) {
       this.updateHandlingFee = true;
       this.errorMessage = "Handling Fee is required.";
     }
     if (this.updateCargoTypeName||this.updateCargoWeight || this.updateHandlingFee) {
     return;
   }
     this.cargotypeservice.updateCargoType(this.selectedCargoType).subscribe({
       next: (response) => {
         Swal.fire({
           icon: 'success',
           title: 'cargoType updated successfully',
           showConfirmButton: true,
         }); 
         this.getAll(); 
         this.resetForm(); 
         this.updateCargocloseModal();
         this.cargoType = new CargoType();
        
       },
       error: (error) => {
         Swal.fire({
           icon: 'error',
           title: 'Error occurred while updating cargoType',
           showConfirmButton: true,
         }); 
       }
     });
   }

   updateCargocloseModal() {
    const modal: HTMLElement = this.updatecargoModal.nativeElement as HTMLElement;
  
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

   filterCustomer() {
    this.filtercustList = this.custList.filter(cust =>
      (cust.custName && cust.custName.toLowerCase().includes(this.searchCustomer.toLowerCase())) ||
      (cust.custPhoneNo && cust.custPhoneNo.toString().includes(this.searchCustomer.toLowerCase())) ||
      (cust.custEmail && cust.custEmail.toLowerCase().includes(this.searchCustomer.toLowerCase())) ||
      (cust.custAddress && cust.custAddress.toLowerCase().includes(this.searchCustomer.toLowerCase())) ||
      (cust.custAge && cust.custAge.toString().includes(this.searchCustomer.toLowerCase()))  
       );
  }

  filterCargoType() {
    this.filterCargoTypeList = this.cargoTypeList.filter(cargo =>
      cargo.cargoTypeName?.toLowerCase().includes(this.searchCargo.toLowerCase()) ||
      cargo.cargoWeight === parseInt(this.searchCargo)
    );
  }

  closeModalForCargo() {
    const modal: HTMLElement = this.addcargoModal.nativeElement as HTMLElement;
  
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
