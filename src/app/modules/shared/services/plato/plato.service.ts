import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(private http: HttpClient) { }

  listPlatos(){
    const END_POINT = `${BASE_URL}/Platos`;
    return this.http.get(END_POINT);
  }

  savePlato(body:any){
    const END_POINT = `${BASE_URL}/Platos`;
    return this.http.post(END_POINT, body);
  }

  updatePlato(body:any, id:any){
    const END_POINT = `${BASE_URL}/Platos/${id}`;
    return this.http.put(END_POINT, body);
  }

  deletePlato(id:any){
    const END_POINT = `${BASE_URL}/Platos/${id}`;
    return this.http.delete(END_POINT);
  }

  getPlatoByNombre(nombre:any){
    const END_POINT = `${BASE_URL}/Plato/nombre/${nombre}`;
    return this.http.get(END_POINT)
  }
}
