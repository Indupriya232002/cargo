import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerComponent } from './components/customer/customer.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CityComponent } from './components/city/city.component';
import { CargoOrderComponent } from './components/cargo-order/cargo-order.component';
import { CargoOrderDetailsComponent } from './components/cargo-order-details/cargo-order-details.component';
import { ProductComponent } from './components/product/product.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CargoTypeComponent } from './components/cargo-type/cargo-type.component';
import { CustomerregistrationComponent } from './components/customerregistration/customerregistration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerComponent,
    EmployeeComponent,
    CityComponent,
    CargoOrderComponent,
    CargoOrderDetailsComponent,
    ProductComponent,
    AdminComponent,
    AdminHomeComponent,
    CargoTypeComponent,
    CustomerregistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
