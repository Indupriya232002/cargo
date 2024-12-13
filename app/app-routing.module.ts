import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminComponent } from './components/admin/admin.component';
import { CargoTypeComponent } from './components/cargo-type/cargo-type.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerregistrationComponent } from './components/customerregistration/customerregistration.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'customers', component:CustomerComponent},
  {path:'adminhome',component:AdminHomeComponent},
  {path:'admin',component:AdminComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'cargoType', component:CargoTypeComponent},
  {path:'customerRegisteration', component:CustomerregistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
