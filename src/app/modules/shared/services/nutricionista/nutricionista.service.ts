import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class NutricionistaService {

  constructor(private http: HttpClient) { }

  listPacientes(id: any){
    const END_POINT = `${BASE_URL}/Nutricionistas/Pacientes/${id}`;
    return this.http.get(END_POINT);
  }

  getPacientes(id:any, apellidos:any){
    const END_POINT = `${BASE_URL}/Nutricionistas/Pacientes/${id}/${apellidos}`;
    return this.http.get(END_POINT);
  }
}
