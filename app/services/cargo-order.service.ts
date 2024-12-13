import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CargoOrder } from '../models/cargo-order.model';

@Injectable({
  providedIn: 'root'
})
export class CargoOrderService {

  baseUrl = "http://localhost:5098/api/CargoOrder/";

  constructor(private http: HttpClient) {

   }

   getCargoOrderByAddress(address: string): Observable<CargoOrder>
   {
    return this.http.get<CargoOrder>(this.baseUrl+'GetCargoOrderByAddress'+address);

   }

   getCargoOrderByStatus(status: string): Observable<CargoOrder>
   {
    return this.http.get<CargoOrder>(this.baseUrl+'GetCargoOrderByStatus'+status);
   }

   getAllCargoOrders() :Observable<CargoOrder[]>
   {
    return this.http.get<CargoOrder[]>(this.baseUrl+'GetAllCargoOrders');
   }

   createANewCargoOrder(data:any): Observable<any>
   {
    console.log(data)
    return this.http.post(this.baseUrl+'CreateANewCargoOrder',data);

   }

   updateCargoOrder(cargoOrder:any): Observable<any> 
   {
    return this.http.put<CargoOrder>(this.baseUrl+'UpdateCargoOrder',cargoOrder);
   }

   deleteCargoOrder(id: number): Observable<any>
   {
    return this.http.delete(this.baseUrl +'DeleteCargoOrder?orderId='+ id);
   }
}
