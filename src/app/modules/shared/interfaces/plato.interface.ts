import { IngredienteInterface } from "./ingrediente.interface";

export interface PlatoInterface{
    id?: number;
    nombre: string;
    receta: string;
    ingredientes: IngredienteInterface[];
}