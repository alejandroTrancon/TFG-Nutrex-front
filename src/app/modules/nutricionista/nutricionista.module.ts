import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutricionistaComponent } from './components/nutricionista/nutricionista.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddPacienteComponent } from './components/add-paciente/add-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerDietasComponent } from './components/ver-dietas/ver-dietas.component';
import { AddDietaComponent } from './components/add-dietas/add-dietas.component';



@NgModule({
  declarations: [
    NutricionistaComponent,
    AddPacienteComponent,
    VerDietasComponent,
    AddDietaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NutricionistaModule { }
