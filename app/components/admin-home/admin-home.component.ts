import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})

export class AdminHomeComponent {
  isAdmin?:boolean=false;
  isEmp?:boolean=false;
  isCust?:boolean=false;
  userName: string | null="";
  

  constructor(private storageService:StorageService)
  {
    
  }

  ngOnInit()
  {
    this.userName = window.localStorage.getItem("userName")
    const role=this.storageService.getUserRole();
    if(role=="Admin")
      this.isAdmin=true;
    if(role=="Employee")
      this.isEmp=true;
    if(role=="Customer")
      this.isCust=true;  
  }

}
