import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteComponent } from './components/paciente/paciente.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    PacienteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ]
})
export class PacienteModule { }
