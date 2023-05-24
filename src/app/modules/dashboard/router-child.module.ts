import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IngredienteComponent } from '../ingrediente/components/ingrediente/ingrediente.component';
import { UsuarioComponent } from '../usuario/components/usuario/usuario.component';

const childRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'ingredientes', component: IngredienteComponent },
    { path: 'usuarios', component: UsuarioComponent },
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: []
})
export class RouterChildModule { }
