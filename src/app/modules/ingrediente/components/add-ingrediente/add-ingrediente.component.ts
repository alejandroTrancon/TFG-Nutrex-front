import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IngredienteService } from 'src/app/modules/shared/services/ingrediente.service';

@Component({
  selector: 'app-add-ingrediente',
  templateUrl: './add-ingrediente.component.html',
  styleUrls: ['./add-ingrediente.component.css']
})
export class AddIngredienteComponent implements OnInit{
  public ingredienteForm: FormGroup;
  constructor(private fb: FormBuilder, private ingredienteService: IngredienteService,
              private dialogRef: MatDialogRef<AddIngredienteComponent>) {
    this.ingredienteForm = this.fb.group( {
      nombre: ['', Validators.required],
      hidratos: ['', Validators.required],
      proteinas: ['', Validators.required],
      grasas: ['', Validators.required],
      sal: ['', Validators.required],
      fibra: ['', Validators.required],

    });
  }
  
  ngOnInit(): void {
  }

  onSave(){
    let data = {
      nombre: this.ingredienteForm.get('nombre')?.value,
      hidratos: this.ingredienteForm.get('hidratos')?.value,
      proteinas: this.ingredienteForm.get('proteinas')?.value,
      grasas: this.ingredienteForm.get('grasas')?.value,
      sal: this.ingredienteForm.get('sal')?.value,
      fibra: this.ingredienteForm.get('fibra')?.value,
    }

    this.ingredienteService.saveIngrediente(data).subscribe( (data: any) => {
      console.log(data);
      this.dialogRef.close(1);
    }, (error: any) => {
      this.dialogRef.close(2);
    });
  }

  onCancel(){

  }
}
