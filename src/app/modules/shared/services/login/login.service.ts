import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environments';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>;

  constructor(private http:HttpClient) { }

  public generateToken(loginData:any){
    const END_POINT = `${BASE_URL}/auth/authenticate`;
    return this.http.post(END_POINT, loginData);
  }

  public logInUser(token:any){
    localStorage.setItem('token', token);
  }

  public isLoggedIn(): boolean {
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  public LogOutUser(): boolean{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.LogOutUser();
      return null;
    }
  }

  public getRolUser(){
    let user = this.getUser();
    return user.authorities[0].authority
  }

  public getCurrentUser(){
    const END_POINT = `${BASE_URL}/auth/actual-user`;
    return this.http.get(END_POINT,)
  }
}
