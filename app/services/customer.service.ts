import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

   baseUrl = "http://localhost:5098/api/Customer/";

  constructor(private http: HttpClient) {

  }

  addCustomer(data:any): Observable<any>
  {
    return this.http.post(this.baseUrl+'AddCustomer',data);
  }

  getAllCustomers() :Observable<Customer[]>
  {
    return this.http.get<Customer[]>(this.baseUrl+'GetAllCustomers');
  }

  deleteCustomerById(id: number): Observable<any>
  {
    
    return this.http.delete(this.baseUrl +'DeleteCustomerById?id='+ id);

  }

  getCustomerById(id: number): Observable<Customer>
  {
    return this.http.get<Customer>(this.baseUrl+'GetCustomerById?id='+id);
  }


  searchForCustomers(keyword: string): Observable<Customer[]>
  {
    return this.http.get<Customer[]>(this.baseUrl+'SearchForCustomers'+'search?q=' + keyword);

  }

  updateCustomer(customer:any): Observable<any> 
  {
    return this.http.put<Customer>(this.baseUrl+'UpdateCustomer', customer);
  }
 

}
