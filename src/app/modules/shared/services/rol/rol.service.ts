import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  public listRoles(){
    const END_POINT = `${BASE_URL}/Roles`;
    return this.http.get(END_POINT);
  }

  public getRolById(id:any){
    const END_POINT = `${BASE_URL}/Rol/id/${id}`;
    return this.http.get(END_POINT)
  }
}
