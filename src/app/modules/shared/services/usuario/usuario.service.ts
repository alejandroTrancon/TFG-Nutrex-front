import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  /**
   * 
   */
  listUsuarios(){
    const END_POINT = `${BASE_URL}/Usuarios`;
    return this.http.get(END_POINT);
  }

  saveUsuario(body:any){
    const END_POINT = `${BASE_URL}/Usuarios`;
    return this.http.post(END_POINT, body);
  }

  updateIngrediente(body: any, id:any){
    const END_POINT = `${BASE_URL}/Usuarios/${id}`;
    return this.http.put(END_POINT, body);
  }

  getUsuarioByEmail(email:any){
    const END_POINT = `${BASE_URL}/Usuario/email/${email}`;
    return this.http.get(END_POINT)
  }
}
