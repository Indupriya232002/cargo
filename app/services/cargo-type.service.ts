import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargoType } from '../models/cargo-type.model';

@Injectable({
  providedIn: 'root'
})
export class CargoTypeService {
  baseUrl = "http://localhost:5098/api/CargoType/"
 
  constructor(private http: HttpClient)
  {
 
  }
 
  addCargo(data:any): Observable<any>
  {
    return this.http.post(this.baseUrl+'AddCargoType',data);
 
  }
 
  cargoTypeId(id: number): Observable<CargoType>
  {
    return this.http.get<CargoType>(this.baseUrl+'CargoTypeId'+id);
  }
 

  deleteCargo (id: number): Observable<any>
  {
    return this.http.delete(this.baseUrl +'DeleteCargo?cargoTypeId='+ id);
 
  }
 
  getAll():Observable<CargoType[]>
  {
    return this.http.get<CargoType[]>(this.baseUrl+'GetAll');
 
  }
 
  updateCargoType(customer:any): Observable<any>
  {
    return this.http.put<CargoType>(this.baseUrl+'UpdateCargoType', customer);
  }
}
``