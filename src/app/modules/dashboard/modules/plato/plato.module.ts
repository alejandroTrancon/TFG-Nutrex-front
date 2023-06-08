import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlatoComponent } from './components/add-plato/add-plato.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatoComponent } from './components/plato/plato.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/modules/shared/material.module';



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
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class PlatoModule { }
