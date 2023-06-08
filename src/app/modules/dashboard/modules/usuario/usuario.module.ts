import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { MaterialModule } from 'src/app/modules/shared/material.module';



@NgModule({
  declarations: [
    UsuarioComponent,
    AddUsuarioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
