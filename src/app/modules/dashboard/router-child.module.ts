import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IngredienteComponent } from './modules/ingrediente/components/ingrediente/ingrediente.component';
import { PlatoComponent } from './modules/plato/components/plato/plato.component';
import { UsuarioComponent } from './modules/usuario/components/usuario/usuario.component';
import { DietaComponent } from './modules/dieta/components/dieta/dieta.component';
import { AdminGuard } from '../shared/services/guard/admin/admin.guard';

const childRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AdminGuard]},
    { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
    { path: 'ingredientes', component: IngredienteComponent, canActivate: [AdminGuard] },
    { path: 'usuarios', component: UsuarioComponent, canActivate: [AdminGuard] },
    { path: 'platos', component: PlatoComponent, canActivate: [AdminGuard] },
    { path: 'dietas', component: DietaComponent, canActivate: [AdminGuard] },
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: []
})
export class RouterChildModule { }
