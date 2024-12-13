import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';
//import { AuthService } from '../../services/auth.service';
//import { User } from '../../models/user.model';
import { Login } from '../../models/login.model';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoggedIn = false;
  user: Login = {
    userName: '',
    password: '',
    role : '',
    email:''
  }

   validateUserName = false;
   validatePwd = false;
   validateRole =  false;
   validateEmail = false;
   signupValidateUserName = false;
   signupValidatePwd = false;
   signupValidateRole =  false;
   signupValidateEmail = false;
   errorMessage : string = "";
   showEmailError: boolean = false;
  message?: string;
  currentRole?: string = 'Admin'
  isLogIn : boolean = false;


  constructor(private storageService: StorageService, private router: Router) { }
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.clearAll();
  }


  login(): void {
    if (!this.user.userName || this.user.userName.trim() === '') {
      this.validateUserName = true;
      return;
    }
    if (!this.user.password) {
      this.validatePwd = true;
      this.errorMessage = "Password is required";
      return;
    }
    if(!this.validatePassword(this.user.password))
    {
      this.user.password = "";
      this.validatePwd = true;
      this.errorMessage = "Password must be  atleast 7 characters along with one special character";
      return;
    }
    if (!this.user.role) {
      this.validateRole = true;
      return;
    }
      this.storageService.login(this.user).subscribe({
        next: (response) => {
          if(response.message != "Invalid username and password")
          {
            this.storageService.saveUser(response);
            const userName = this.user?.userName || ''; 
            window.localStorage.setItem('userName', userName);
            this.storageService.saveUserRole(this.user.role);
            window.location.reload();       
          }
          else
          {
            Swal.fire({
              icon: 'error',
              title: 'Invalid User Credentials! Please try again',
              showConfirmButton: true,
            }); 
          }
        },
        error: (error) => {
          alert("Invalid User Name and Password!!")
        }
      });
  }

  
  clearAll() {
    this.user = new Login();
    this.validateUserName = false;
    this.validatePwd = false;
    this.validateRole =  false;
    this.validateEmail = false;
    this.signupValidateUserName = false;
    this.signupValidatePwd = false;
    this.signupValidateRole =  false;
    this.signupValidateEmail = false;
    this.user = {};
 
  }

  showSignUp()
  {
    this.isLogIn = true;
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

  // signUp()
  // {
  //   if (!this.user.userName || this.user.userName.trim() === '') {
  //     this.signupValidateUserName = true;
  //     return;
  //   }
  //   if (!this.user.email) {
  //     this.signupValidateEmail = true;
  //     this.errorMessage = "Email is required.";
  //     return;
  //   }
  //   if(!this.validateEmailFormat(this.user.email))
  //   {
  //     this.user.email = "";
  //     this.signupValidateEmail = true;
  //     this.errorMessage = "Please enter a valid email address in lowercase ending with '@gmail.com'.";
  //     return;
  //   }
  //   if (!this.user.password) {
  //     this.signupValidatePwd = true;
  //     this.errorMessage = "Password is required";
  //     return;
  //   }
  //   if(!this.validatePassword(this.user.password))
  //   {
  //     this.user.password = "";
  //     this.signupValidatePwd = true;
  //     this.errorMessage = "Password must be  atleast 7 characters along with one special character";
  //     return;
  //   }
  //   if (!this.user.role) {
  //     this.signupValidateRole = true;
  //     return;
  //   }
  //   this.storageService.SignUp(this.user).subscribe({
  //     next:(response) =>{
  //       this.isLogIn = false;
  //       this.user = {};
  //       this.clearAll();
  //     },
  //     error:(error)=>{
  //       alert('Error....!!!');
  //     }
  //   });
  // }
}