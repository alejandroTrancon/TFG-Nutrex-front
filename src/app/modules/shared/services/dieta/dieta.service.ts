import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class DietaService {

  constructor(private http: HttpClient) { }

  listDietas(){
    const END_POINT = `${BASE_URL}/Dietas`;
    return this.http.get(END_POINT);
  }

  saveDieta(body:any){
    const END_POINT = `${BASE_URL}/Dietas`;
    return this.http.post(END_POINT, body);
  }

  updateDieta(body:any, id:any){
    const END_POINT = `${BASE_URL}/Dietas/${id}`;
    return this.http.put(END_POINT, body);
  }



  deleteDieta(id:any){
    const END_POINT = `${BASE_URL}/Dietas/${id}`;
    return this.http.delete(END_POINT);
  }
}
