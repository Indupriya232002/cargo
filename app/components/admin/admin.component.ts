import { Component, ElementRef, ViewChild } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { BootstrapOptions } from '@angular/core';
import { Router } from '@angular/router';
import { CargoType } from '../../models/cargo-type.model';
import { CargoTypeService } from '../../services/cargo-type.service';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AccessPass } from '../../models/access-pass.model';
import { AccessPassService } from '../../services/access-pass.service';
import "@angular/compiler";
import { Inputdata } from '../../models/inputdata.model';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {
  @ViewChild('addemployeeModal')addemployeeModal!: ElementRef;
  @ViewChild('addcargoModal')addcargoModal!: ElementRef;
  @ViewChild('passwordInput')passwordInput!: ElementRef<HTMLInputElement>; 
  @ViewChild('editemployeeModal')editemployeeModal!: ElementRef;
  @ViewChild('updatecargoModal')updatecargoModal!: ElementRef;
  @ViewChild('editcustomerModal')editcustomerModal!: ElementRef;
  @ViewChild('addGatePassModal')addGatePassModal!: ElementRef;
  @ViewChild('editgatepassModal')editgatepassModal!: ElementRef;

  isPasswordVisible: boolean = false; 
  employee: Employee = {
    empId: 0,
    empName: "",
    empPhoneNo: null,
    empAddress: "",
    empEmail: "",
    empPwd: "",
    empAge: 0,
    empRole: "",
    empGender: "",
    empSal: 0
  }
  cargoType:CargoType ={
    cargoTypeId: 0,
    cargoTypeName: "",
    cargoWeight: 0,
    handlingFee: 0
  };

  gatePass:AccessPass={
    accessId: 0,
    uniqueAccess: "",
    trukcId: "",
    empId: 0
  };
  
  jsonData?:string
  blobData?:Inputdata

  gatePassList : AccessPass[]=[];
  selectedGatePass: AccessPass = new AccessPass;
  formatErrorMessage : string = "";
  errorMessage : string = "";
  selectedCargoType: CargoType = new CargoType();
  cargoList= new Array<object>();
  empSearchList: Employee[] = [];
  empList : Employee[] = [];
  isModalOpen = false;
  selectedEmployee: Employee = new Employee;
  filteredEmployees: Employee[] = [];
  cargoTypeList : CargoType[] = [];
  selectedCustomer: Customer = new Customer();
  custList : Customer[] = [];
  searchTerm: string = '';

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

   validateAccessId= false;
   validateUniqueAccess= false;
   validateEntryTime= false;
   validateExitTime= false;
   validateTrukcId= false;
   validateEmpId= false;

   updateValidateAccessId= false;
   updateValidateUniqueAccess= false;
   updateValidateEntryTime= false;
   updateValidateExitTime= false;
   updateValidateTrukcId= false;
   updateValidateEmpId= false;

   employeeName = false;
   employeePhoneNo = false;
   employeeAddress =  false;
   employeeEmail = false;
   employeePwd = false;
   employeeAge = false;
   employeeRole= false;
   employeeGender= false;
   employeeSal = false;

   updateEmployeeId = false;
   updateEmployeeName = false;
   updateEmployeePhoneNo = false;
   updateEmployeeAddress =  false;
   updateEmployeeEmail = false;
   updateEmployeePwd = false;
   updateEmployeeAge = false;
   updateEmployeeRole= false;
   updateEmployeeGender= false;
   updateEmployeeSal = false;

   updateCustId = false;
   updateCustName = false;
   updateCustPhoneNo = false;
   updateCustEmail = false;
   updateCustPwd = false;
   updateCustAddress = false;
   updateCustGender = false;
   updateCustAge = false;

   cargoTypeId =  false;
   cargoTypeName = false;
   cargoWeight = false;
   handlingFee = false;

   updateCargoTypeId =  false;
   updateCargoTypeName = false;
   updateCargoWeight = false;
   updateHandlingFee = false;

   filterGatePassList : AccessPass[]=[];
   searchGatePass = "";

  filteredEmpList?: any[];
  searchQuery = "";
  
  filterCargoTypeList : CargoType[] = [];
  searchCargo = "";

  filtercustList : Customer[]= [];
  searchCustomer = "";
  showEmailError: boolean = false;
  private emailInputSubject = new Subject<string>();
  passwordVisible: boolean = false;
  emailErrorMessage='';
  phoneErrorMessage='';
  passwordErrorMessage='';
  updateEmailErrorMessage= '';
  updatePhoneErrorMessage= '';
  updatePasswordErrorMessage= '';
  updateCusPasswordErrorMessage: string="";
  updateCusEmailErrorMessage: string="";
  updateCusPhoneErrorMessage: string="";

  constructor(private employeeservice: EmployeeService,private router: Router,private cargotypeservice:CargoTypeService
    ,private customerservice:CustomerService,private formBuilder: FormBuilder,private modalService: NgbModal,private accessPassService:AccessPassService,
    private storageService:StorageService) {

  }

  ngOnInit() {
    this.getAllEmployees();
    this.resetForm();
    this.getAll();
    this.getAllCustomers();
    this.getAllAccessPasses();
    this.custList = new Array<object>(); 
  }

  resetForm() {
   this.employeeName = false;
   this.employeePhoneNo = false;
   this.employeeAddress =  false;
   this.employeeEmail = false;
   this.employeePwd = false;
   this.employeeAge = false;
   this.employeeRole= false;
   this.employeeGender= false;
   this.employeeSal = false;
   this.employee = {}; 
   this.cargoTypeName = false;
   this.cargoWeight = false;
   this.handlingFee = false;
   this.customer ={};
   this.cargoType = {};
   this.showEmailError = false;
   this.updateEmployeeId = false;
   this.updateEmployeeName = false;
   this.updateEmployeePhoneNo = false;
   this.updateEmployeeAddress =  false;
   this.updateEmployeeEmail = false;
   this.updateEmployeePwd = false;
   this.updateEmployeeAge = false;
   this.updateEmployeeRole= false;
   this.updateEmployeeGender= false;
   this.updateEmployeeSal = false;
   this.updateCargoTypeId =  false;
   this.updateCargoTypeName = false;
   this.updateCargoWeight = false;
   this.updateHandlingFee = false;
   this.updateCustId = false;
   this.updateCustName = false;
   this.updateCustPhoneNo = false;
   this.updateCustEmail = false;
   this.updateCustPwd = false;
   this.updateCustAddress = false;
   this.updateCustGender = false;
   this.updateCustAge = false;
   this.validateAccessId= false;
   this.validateUniqueAccess= false;
   this.validateEntryTime= false;
   this.validateExitTime= false;
   this.validateTrukcId= false;
   this.validateEmpId= false;
   this.updateValidateAccessId= false;
   this.updateValidateUniqueAccess= false;
   this.updateValidateEntryTime= false;
   this.updateValidateExitTime= false;
   this.updateValidateTrukcId= false;
   this.updateValidateEmpId= false;
   this.gatePass = {};
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

  togglePasswordVisibility(input: HTMLInputElement): void {
    this.isPasswordVisible = !this.isPasswordVisible; // Toggle visibility flag
    input.type = this.isPasswordVisible ? 'text' : 'password'; // Change input type
  }
  
  getAllAccessPasses() {
    this.accessPassService.getAllAccessPasses().subscribe({
      next: (response) => {
        this.gatePassList = response;
        this.filterGatePassList = this.gatePassList;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error....!!!',
          showConfirmButton: true,
        }); 
      }
    });
  }

  generateGatePass() {
    this.validateUniqueAccess= false;
    this.validateEntryTime= false;
    this.validateExitTime= false;
    this.validateTrukcId= false;
    this.validateEmpId= false;

   if (!this.gatePass.entryTime) {
     this.validateEntryTime = true;
     this.errorMessage = "Entry Time is required.";
    } 
   if (!this.gatePass.exitTime) {
     this.validateExitTime = true;
     this.errorMessage = "Exit Time is required.";
    }
   if (!this.gatePass.trukcId || this.gatePass.trukcId.trim() === '') {
     this.validateTrukcId = true;
     this.errorMessage = "Truck Number is required.";
    } 
   if (!this.gatePass.empId) {
     this.validateEmpId = true;
     this.errorMessage = "Employee Id is required.";
    } 
 
   if (this.validateEntryTime || this.validateExitTime || this.validateTrukcId || 
       this.validateEmpId) {
     return;
    }
       this.accessPassService.generateGatePass(this.gatePass).subscribe({
         next: (response) => {
           Swal.fire({
             icon: 'success',
             title: 'Gate Pass Generated...........',
             showConfirmButton: true,
           });  
           this.getAllAccessPasses();
           this.closeModalForGatePass();
           this.resetForm();
         },
         error: (error) => {
           Swal.fire({
             icon: 'error',
             title: 'Error....!!!',
             showConfirmButton: true,
           });  
         }
       });
   }

   deleteGatePass(id: number)
   {
     this.accessPassService.deleteGatePass(id).subscribe({
       next: (response) => {
         Swal.fire({
           icon: 'success',
           title: 'Gate Pass deleted successfully',
           showConfirmButton: true,
         }); 
         this.getAllAccessPasses();
         this.gatePass=response;
       },
       error: (error) => {
         Swal.fire({
           icon: 'error',
           title: 'Error occurred while deleting Gate Pass',
           showConfirmButton: true,
         }); 
       }
     });
   }

   updateGatePass() {
    this.updateValidateAccessId= false;
    this.updateValidateUniqueAccess= false;
    this.updateValidateEntryTime= false;
    this.updateValidateExitTime= false;
    this.updateValidateTrukcId= false;
    this.updateValidateEmpId= false;

    if (! this.selectedGatePass.accessId) {
     this.updateValidateAccessId = true;
     this.errorMessage = "Access Id is required.";
    }
    if (! this.selectedGatePass.uniqueAccess ||  this.selectedGatePass.uniqueAccess.trim() === '') {
     this.updateValidateUniqueAccess = true;
     this.errorMessage = "Access Key is required.";
    }
   if (! this.selectedGatePass.entryTime) {
     this.updateValidateEntryTime = true;
     this.errorMessage = "Entry Time is required.";
    } 
   if (! this.selectedGatePass.exitTime) {
     this.updateValidateExitTime = true;
     this.errorMessage = "Exit Time is required.";
    }
   if (! this.selectedGatePass.trukcId ||  this.selectedGatePass.trukcId.trim() === '') {
     this.updateValidateTrukcId = true;
     this.errorMessage = "Truck Number is required.";
    } 
   if (!this.selectedGatePass.empId) {
     this.updateValidateEmpId = true;
     this.errorMessage = "Employee Id is required.";
    }

   if (this.updateValidateAccessId||this.updateValidateUniqueAccess || this.updateValidateEntryTime || this.updateValidateExitTime || this.updateValidateTrukcId || 
       this.updateValidateEmpId) {
     return;
    }
   this.selectedGatePass.entryTime = this.convertToDesiredFormat(this.selectedGatePass.entryTime);
    this.accessPassService.updateGatePass(this.selectedGatePass).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Gate Pass updated successfully',
          showConfirmButton: true,
        }); 
        this.getAllAccessPasses();
        this.resetForm(); 
        this.updateGatePasscloseModal();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error occured while updating Gate Pass',
          showConfirmButton: true,
        }); 
      }
    });
  }

  executeGatePassFunctionOnConfirm(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete the Gate Pass',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteGatePass(id);
      }
    });
  }  

  addEmployee() {
   this.passwordErrorMessage='',
   this.emailErrorMessage='',
   this.phoneErrorMessage = '';
   this.employeeName = false;
   this.employeePhoneNo = false;
   this.employeeAddress =  false;
   this.employeeEmail = false;
   this.employeePwd = false;
   this.employeeAge = false;
   this.employeeRole= false;
   this.employeeGender= false;
   this.employeeSal = false;
   if (!this.employee.empName || this.employee.empName.trim() === '') {
    this.employeeName = true;
    this.errorMessage = "Name is required.";
  }
  if (!this.employee.empEmail) {
    this.employeeEmail = true;
    this.emailErrorMessage = "Email is required.";
  } else if (!this.validateEmailFormat(this.employee.empEmail)) {
    this.employeeEmail = true;
    this.employee.empEmail= '';
    this.emailErrorMessage = "Please enter a valid email address in lowercase ending with '@gmail.com'.";
  }
  if (!this.employee.empGender || this.employee.empGender.trim() === '') {
    this.employeeGender = true;
    this.errorMessage = "Gender is required.";
  }
  if (!this.employee.empPhoneNo || isNaN(this.employee.empPhoneNo)) {
    this.employeePhoneNo = true;
    this.phoneErrorMessage = "Phone Number is required.";
  } else if (!this.validatePhoneNumber(this.employee.empPhoneNo)) {
    this.employeePhoneNo = true;
    this.employee.empPhoneNo = '';
    this.phoneErrorMessage = "Phone Number must be 10 digits.";
  }
  if (!this.employee.empPwd) {
    this.employeePwd = true;
    this.passwordErrorMessage = "Password is required.";
  } else if (!this.validatePassword(this.employee.empPwd)) {
    this.employeePwd = true;
    this.employee.empPwd = '';
    this.passwordErrorMessage = "Password must be at least 7 characters along with one special character.";
  }
  if (!this.employee.empSal || isNaN(this.employee.empSal)) {
    this.employeeSal = true;
    this.errorMessage = "Salary is required.";
  }
  if (!this.employee.empAddress || this.employee.empAddress.trim() === '') {
    this.employeeAddress = true;
    this.errorMessage = "Address is required.";
  }
  if (!this.employee.empAge) {
    this.employeeAge = true;
    this.errorMessage = "Age is required.";
  }
  if (!this.employee.empRole || this.employee.empRole.trim() === '') {
    this.employeeRole = true;
    this.errorMessage = "Role is required.";
  }

  if (this.employeeName || this.employeeEmail || this.employeeGender || this.employeePhoneNo || 
      this.employeePwd || this.employeeSal || this.employeeAddress || this.employeeAge || 
      this.employeeRole) {
    return;
  }
    let isItemFound = false;

    this.empList.forEach((ele) => {
      let match = true;
      for (const key in ele) {
        if (key != 'empId' && ( key == "empEmail" || key == "empPhoneNo")){
          if ((ele as any)[key] != (this.employee as any)[key]) {
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
          title: 'Employee already exists',
          showConfirmButton: true,
        });  
        return;
      }
    });

    if(!isItemFound)
    {
      this.employeeservice.addEmployee(this.employee).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Employee added...........',
            showConfirmButton: true,
          });  
          this.getAllEmployees();
          this.closeModal();
          this.resetForm();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error....!!!',
            showConfirmButton: true,
          });  
        }
      });
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

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  openEditModal(employee: Employee) {
    this.selectedEmployee = employee;
  }

  openEditModalForCargo(cargoType: CargoType) {
    this.selectedCargoType = cargoType;
  }

  convertEntryToExitFormat(entryTime: string): string {
    const entryDate = new Date(entryTime);
    const exitTimeFormatted = entryDate.toISOString().slice(0, 19).replace('T', ' '); 
    return exitTimeFormatted;
  }

  convertToDesiredFormat(originalTime: string): string {
    const parts = originalTime.split(' ');
    const datePart = parts[0];
    const timePart = parts[1];
  
    const dateParts = datePart.split('-');
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);
  
    const timeParts = timePart.split(':');
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);
  
    const originalDate = new Date(year, month - 1, day, hours, minutes, seconds);
  
    const desiredFormat = originalDate.toISOString();
    return desiredFormat;
  }

  openEditModalForGatePass(gatePass:AccessPass) {
    this.selectedGatePass = gatePass;
    this.selectedGatePass.entryTime = this.convertEntryToExitFormat(gatePass.entryTime);
  }


  openEditModalForCustomer(customer: Customer) {
    this.selectedCustomer = customer;
  }

  getAllEmployees() {
    this.employeeservice.getAllEmployees().subscribe({
      next: (response) => {
        this.empList = response;
        this.filteredEmpList = this.empList;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error....!!!',
          showConfirmButton: true,
        }); 
      }
    });
  }

  executeFunctionOnConfirm(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete the employee',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEmployee(id);
      }
    });
  }

  deleteEmployee(id: number) { 
      this.employeeservice.deleteEmployee(id).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Employee Deleted Successfully',
            showConfirmButton: true,
          });  
          this.getAllEmployees();
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error occurred while deleting employee',
            showConfirmButton: true,
          }); 
        }
      });
  }

  getEmployeeById(id: number) {
    this.employeeservice.getEmployeeById(id).subscribe({
      next: (response) => {
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error occurred while retrieving employee by ID',
          showConfirmButton: true,
        }); 
      }
    });
  }

  updateEmployee() {
    this.updatePasswordErrorMessage='',
    this.updateEmailErrorMessage='',
    this.updatePhoneErrorMessage = '';
    this.updateEmployeeId = false;
    this.updateEmployeeName = false;
    this.updateEmployeePhoneNo = false;
    this.updateEmployeeAddress =  false;
    this.updateEmployeeEmail = false;
    this.updateEmployeePwd = false;
    this.updateEmployeeAge = false;
    this.updateEmployeeRole= false;
    this.updateEmployeeGender= false;
    this.updateEmployeeSal = false;
    if (! this.selectedEmployee.empId) {
     this.updateEmployeeId = true;
     this.errorMessage = "Id is required.";
    }
    if (! this.selectedEmployee.empName ||  this.selectedEmployee.empName.trim() === '') {
     this.updateEmployeeName = true;
     this.errorMessage = "Name is required.";
    }
    if (! this.selectedEmployee.empEmail) {
     this.updateEmployeeEmail = true;
     this.updateEmailErrorMessage = "Email is required.";
    } else if (!this.validateEmailFormat( this.selectedEmployee.empEmail)) {
     this.updateEmployeeEmail = true;
     this.selectedEmployee.empEmail= '';
     this.updateEmailErrorMessage = "Please enter a valid email address in lowercase ending with '@gmail.com'.";
    }
    if (! this.selectedEmployee.empGender ||  this.selectedEmployee.empGender.trim() === '') {
     this.updateEmployeeGender = true;
     this.errorMessage = "Gender is required.";
    }
    if (! this.selectedEmployee.empPhoneNo || isNaN( this.selectedEmployee.empPhoneNo)) {
     this.updateEmployeePhoneNo = true;
     this.updatePhoneErrorMessage = "Phone Number is required.";
    } else if (!this.validatePhoneNumber( this.selectedEmployee.empPhoneNo)) {
     this.updateEmployeePhoneNo = true;
     this.selectedEmployee.empPhoneNo = '';
     this.updatePhoneErrorMessage = "Phone Number must be 10 digits.";
    }
    if (!this.selectedEmployee.empPwd) {
     this.updateEmployeePwd = true;
     this.updatePasswordErrorMessage = "Password is required.";
    } else if (!this.validatePassword( this.selectedEmployee.empPwd)) {
     this.updateEmployeePwd = true;
     this.selectedEmployee.empPwd = '';
     this.updatePasswordErrorMessage = "Password must be at least 7 characters along with one special character.";
    }
    if (! this.selectedEmployee.empSal || isNaN( this.selectedEmployee.empSal)) {
     this.updateEmployeeSal = true;
     this.errorMessage = "Salary is required.";
    }
    if (! this.selectedEmployee.empAddress ||  this.selectedEmployee.empAddress.trim() === '') {
     this.updateEmployeeAddress = true;
     this.errorMessage = "Address is required.";
    }
    if (! this.selectedEmployee.empAge) {
     this.updateEmployeeAge = true;
     this.errorMessage = "Age is required.";
    }
    if (! this.selectedEmployee.empRole ||  this.selectedEmployee.empRole.trim() === '') {
     this.updateEmployeeRole = true;
     this.errorMessage = "Role is required.";
    }
   
   if (this.updateEmployeeId||this.updateEmployeeName || this.updateEmployeeEmail || this.updateEmployeeGender || this.updateEmployeePhoneNo || 
       this.updateEmployeePwd || this.updateEmployeeSal || this.updateEmployeeAddress || this.updateEmployeeAge || 
       this.updateEmployeeRole) {
     return;
    }
    this.employeeservice.updateEmployee(this.selectedEmployee).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Employee updated successfully',
          showConfirmButton: true,
        }); 
        this.getAllEmployees();
        this.resetForm(); 
        this.updateEmpcloseModal();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error occurred while updating employee',
          showConfirmButton: true,
        }); 
      }
    });
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
          title: 'Error....!!!',
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
        this.getAll(); // Refresh employee list after deletion
        this.cargoType=response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error occurred while deleting cargotype',
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

   executeAdminFunctionOnConfirm(id: number) {
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
            title: 'Customer deleted successfully...........',
            showConfirmButton: true,
          }); 
          this.getAllCustomers();
          this.customer = response;
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

  getAllCustomers()
  {
    this.customerservice.getAllCustomers().subscribe({
      next:(response) =>{
        this.custList = response;
        this.filtercustList =this.custList;
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

  filterEmployees() {
    this.filteredEmpList = this.empList.filter(emp =>
      (emp.empName && emp.empName.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
      (emp.empRole && emp.empRole.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
      (emp.empPhoneNo && emp.empPhoneNo.toString().includes(this.searchQuery.toLowerCase())) ||
      (emp.empAddress && emp.empAddress.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
      (emp.empEmail && emp.empEmail.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
      (emp.empSal && emp.empSal.toString().includes(this.searchQuery)) 
       );
  }

  filterGatePasses() {
    this.filterGatePassList = this.gatePassList.filter(pass =>
      (pass.trukcId && pass.trukcId.toLowerCase().includes(this.searchGatePass.toLowerCase())) ||
      (pass.entryTime && pass.entryTime.toString().toLowerCase().includes(this.searchGatePass.toLowerCase())) ||
      (pass.exitTime && pass.exitTime.toString().toLowerCase().includes(this.searchGatePass.toLowerCase()))
    );
  }

  filterCargoType() {
    this.filterCargoTypeList = this.cargoTypeList.filter(cargo =>
      (cargo.cargoTypeName && cargo.cargoTypeName.toLowerCase().includes(this.searchCargo.toLowerCase())) ||
      (cargo.cargoWeight && cargo.cargoWeight.toString().includes(this.searchCargo.toLowerCase())) ||
      (cargo.handlingFee && cargo.handlingFee.toString().includes(this.searchCargo.toLowerCase()))
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

  updateEmpcloseModal() {
    const modal: HTMLElement = this.editemployeeModal.nativeElement as HTMLElement;
  
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

closeModal() {
  const modal: HTMLElement = this.addemployeeModal.nativeElement as HTMLElement;

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

closeModalForGatePass() {
  const modal: HTMLElement = this.addGatePassModal.nativeElement as HTMLElement;
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

updateGatePasscloseModal() {
  const modal: HTMLElement = this.editgatepassModal.nativeElement as HTMLElement;
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

