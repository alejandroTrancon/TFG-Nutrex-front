import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';



@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class ErrorModule { }
