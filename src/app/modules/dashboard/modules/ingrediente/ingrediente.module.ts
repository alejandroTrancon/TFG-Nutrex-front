import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredienteComponent } from './components/ingrediente/ingrediente.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddIngredienteComponent } from './components/add-ingrediente/add-ingrediente.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';



@NgModule({
  declarations: [
    IngredienteComponent,
    AddIngredienteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IngredienteModule { }
