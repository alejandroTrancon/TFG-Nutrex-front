import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments.prod';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  listDietas(id:any){
    const END_POINT = `${BASE_URL}/Pacientes/Dietas/${id}`;
    return this.http.get(END_POINT);
  }



  
}
