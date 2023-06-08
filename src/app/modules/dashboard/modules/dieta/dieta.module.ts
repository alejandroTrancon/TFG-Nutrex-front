import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietaComponent } from './components/dieta/dieta.component';
import { AddDietaComponent } from './components/add-dieta/add-dieta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    DietaComponent,
    AddDietaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DietaModule { }
