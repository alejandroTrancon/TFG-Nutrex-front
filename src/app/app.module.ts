import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './modules/login/login.module';
import { AuthInterceptorProviders } from './modules/shared/services/auth.interceptor';
import { PacienteModule } from './modules/paciente/paciente.module';
import { NutricionistaModule } from './modules/nutricionista/nutricionista.module';
import { ErrorModule } from './modules/error/error.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule,
    LoginModule,
    NutricionistaModule,
    PacienteModule,
    ErrorModule
  ],
  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
