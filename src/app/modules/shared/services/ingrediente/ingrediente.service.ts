import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private http: HttpClient) { }

  /**
   * Listado de los ingredientes
   */
  listIngredientes(){
    const END_POINT = `${BASE_URL}/Ingredientes`;
    return this.http.get(END_POINT);
  }

  /**
   * 
   */
  saveIngrediente(body: any){
    const END_POINT = `${BASE_URL}/Ingredientes`;
    return this.http.post(END_POINT, body);
  }

  /**
   * 
   */
  updateIngrediente(body: any, id:any){
    const END_POINT = `${BASE_URL}/Ingredientes/${id}`;
    return this.http.put(END_POINT, body);
  }

  /**
   * 
   */
  deleteIngrediente(id:any){
    const END_POINT = `${BASE_URL}/Ingredientes/${id}`;
    return this.http.delete(END_POINT);
  }

  /**
   * 
   */
  getIngredienteByName(name:any){
    const END_POINT = `${BASE_URL}/Ingrediente/${name}`;
    return this.http.get(END_POINT);
  }





}
