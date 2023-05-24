import { RolInterface } from "./rol.interface";

export interface UsuarioInterface{
    id?: number;
    nombre: string;
    apellidos: string;
    email:string;
    telefono: string;
    password: string;
    activo: boolean;
    bloqueado: boolean;
    rol: any;
}