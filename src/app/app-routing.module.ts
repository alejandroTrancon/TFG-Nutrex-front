import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';
import { LoginComponent } from './modules/login/login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'login', pathMatch: 'full', component: LoginComponent },

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
