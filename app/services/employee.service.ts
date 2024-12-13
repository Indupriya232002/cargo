import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl =" http://localhost:5098/api/Employee/"

  constructor(private http: HttpClient)
  {
 
  }
 
  addEmployee(data:any): Observable<any>
  {
    return this.http.post(this.baseUrl+'AddEmployee',data);
  }
 

  deleteEmployee(id: number): Observable<any>
  {
    return this.http.delete(this.baseUrl +'DeleteEmployee?employeeId='+ id);
  }


 
  getAllEmployees():Observable<Employee[]>
  {
    return this.http.get<Employee[]>(this.baseUrl+'GetAllEmployees');
  }
 
  getEmployeeById(id: number): Observable<Employee>
  {
    return this.http.get<Employee>(this.baseUrl+id);
  }
 
  updateEmployee(employee:any): Observable<any>
  {
    return this.http.put<Employee>(this.baseUrl+'UpdateEmployee', employee);
 
  }  

}

