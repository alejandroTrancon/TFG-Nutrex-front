import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlatoComponent } from './components/add-plato/add-plato.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatoComponent } from './components/plato/plato.component';



@NgModule({
  declarations: [
    PlatoComponent,
    AddPlatoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlatoModule { }
