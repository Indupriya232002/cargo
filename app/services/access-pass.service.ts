import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessPass } from '../models/access-pass.model';

@Injectable({
  providedIn: 'root'
})
export class AccessPassService {
  baseUrl = " http://localhost:5098/api/AccessPass/";
 
  constructor(private http: HttpClient) { }

  getAllAccessPasses() :Observable<AccessPass[]>
  {
   return this.http.get<AccessPass[]>(this.baseUrl+'GetAllAccessPasses');
  }

  generateGatePass(data:any): Observable<any>
  {
   console.log(data)
   return this.http.post(this.baseUrl+'GenerateGatePass',data);

  }

  updateGatePass(accessPass:any): Observable<any> 
  {
   return this.http.put<AccessPass>(this.baseUrl+'UpdateGatePass',accessPass);
  }

  deleteGatePass(id: number): Observable<any>
  {
    return this.http.delete(this.baseUrl +'DeleteGatePass?id='+ id);
  }

}
