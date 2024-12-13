import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl='http://localhost:5098/api/User/Login';
 
@Injectable({
  providedIn: 'root'
})
export class StorageService {
 
  constructor(private http:HttpClient) { }
  login(logindata:any):Observable<any>{
    return this.http.post(baseUrl,logindata)
 
  }
  clean(): void {
    window.sessionStorage.clear();
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem('user');
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }
  public saveUserRole(role:any){
    window.sessionStorage.setItem('role', JSON.stringify(role));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  public getUserRole(): any {
    const role = window.sessionStorage.getItem('role');
    if (role) {
      return JSON.parse(role);
    }
    return {};
  }
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem('user');
    if (user) {
      return true;
    }
 
    return false;
  }

  SignUp(data:any): Observable<any>
  {
    let newbaseUrl = "http://localhost:5098/api/User/AddUser"
    return this.http.post(newbaseUrl,data);
  }
  sendDataToBlob(data:any):Observable<any>{
    return this.http.post('https://webapitoblobstorage20240410155054.azurewebsites.net/storage',data)
  }
}