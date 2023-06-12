import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

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

  savePaciente(body: any){
    const END_POINT = `${BASE_URL}/Nutricionistas/Pacientes`;
    return this.http.post(END_POINT, body);
  }



  
}
