import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';
import { LoginComponent } from './modules/login/login/login.component';
import { PacienteComponent } from './modules/paciente/components/paciente/paciente.component';
import { PacienteGuard } from './modules/shared/services/guard/paciente/paciente.guard';
import { AdminGuard } from './modules/shared/services/guard/admin/admin.guard';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { NutricionistaComponent } from './modules/nutricionista/components/nutricionista/nutricionista.component';
import { NutricionistaGuard } from './modules/shared/services/guard/nutricionista/nutricionista.guard';
import { ErrorComponent } from './modules/error/error.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent , canActivate: [AdminGuard]},
  { path: 'misDietas', pathMatch: 'full', component: PacienteComponent, canActivate: [PacienteGuard]},
  { path: 'misPacientes', pathMatch: 'full', component: NutricionistaComponent, canActivate: [NutricionistaGuard]},
  { path: '**', pathMatch: 'full', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {enableTracing: false}
  ),
  DashboardRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
