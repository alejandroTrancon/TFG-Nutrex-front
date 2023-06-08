import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { IngredienteModule } from './modules/ingrediente/ingrediente.module';
import { PlatoModule } from './modules/plato/plato.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { DietaModule } from './modules/dieta/dieta.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    IngredienteModule,
    UsuarioModule,
    PlatoModule,
    RouterModule,
    DietaModule
  ]
})
export class DashboardModule { }
