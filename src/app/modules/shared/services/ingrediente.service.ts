import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environments';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private http: HttpClient) { }

  listIngredientes(){
    const END_POINT = `${BASE_URL}/Ingredientes`
    return this.http.get(END_POINT);
    }
}
