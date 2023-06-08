import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteComponent } from './components/paciente/paciente.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PacienteComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PacienteModule { }
