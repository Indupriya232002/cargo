import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cargomanagersystem';
  isLoggedIn=false;
  userName=String;
  password='';

  isAdmin?:boolean=false;
  isEmp?:boolean=false;
  isCust?:boolean=false;
 
  constructor(private storageService: StorageService,private router:Router){}
  ngOnInit(): void{
    this.isLoggedIn=this.storageService.isLoggedIn();
    if(this.isLoggedIn){
      const user=this.storageService.getUser();
      const role=this.storageService.getUserRole();
      if(role=="Admin")
        this.isAdmin=true;
      if(role=="Employee")
        this.isEmp=true;
      if(role=="Customer")
        this.isCust=true;  

      this.userName=user.userName;
      this.password=user.password;
     
      this.router.navigate(['/adminhome'])
    }
  }
  logout(): void {
   
    this.storageService.clean();
 
    window.location.reload();
  }
 
}