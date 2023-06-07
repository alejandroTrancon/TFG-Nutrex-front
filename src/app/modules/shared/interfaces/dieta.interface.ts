import { PlatoInterface } from "./plato.interface";
import { UsuarioInterface } from "./usuario.interface";

export interface DietaInterface{
    id?: number;
    nutricionista: UsuarioInterface;
    paciente: UsuarioInterface;

    platos: PlatoInterface[];
    
}