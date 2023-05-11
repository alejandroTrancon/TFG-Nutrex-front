import { ContentObserver } from '@angular/cdk/observers';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IngredienteService } from 'src/app/modules/shared/services/ingrediente.service';

@Component({
  selector: 'app-add-ingrediente',
  templateUrl: './add-ingrediente.component.html',
  styleUrls: ['./add-ingrediente.component.css']
})
export class AddIngredienteComponent implements OnInit{
  public ingredienteForm: FormGroup;
  estadoFormulario: string = "Añadir";
  constructor(private fb: FormBuilder, private ingredienteService: IngredienteService,
              private dialogRef: MatDialogRef<AddIngredienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    
    
    this.ingredienteForm = this.fb.group( {
      id: [''],
      nombre: ['', Validators.required],
      hidratos: ['', Validators.required],
      proteinas: ['', Validators.required],
      grasas: ['', Validators.required],
      sal: ['', Validators.required],
      fibra: ['', Validators.required],
      
    });

    if(data != null){
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";
    }
  }
  
  ngOnInit(): void {
  }

  onSave(){
    let data = {
      id: this.ingredienteForm.get('id')?.value,
      nombre: this.ingredienteForm.get('nombre')?.value,
      hidratos: this.ingredienteForm.get('hidratos')?.value,
      proteinas: this.ingredienteForm.get('proteinas')?.value,
      grasas: this.ingredienteForm.get('grasas')?.value,
      sal: this.ingredienteForm.get('sal')?.value,
      fibra: this.ingredienteForm.get('fibra')?.value,
    }

    if(data.id != ""){
      this.ingredienteService.updateIngrediente(data, this.data.id).subscribe( (data: any) => {
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    } else {
      this.ingredienteService.saveIngrediente(data).subscribe( (data: any) => {
        console.log(data);
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    }

    
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data:any){
    this.ingredienteForm = this.fb.group( {
      id: [data.id, Validators.required],
      nombre: [data.nombre, Validators.required],
      hidratos: [data.hidratos, Validators.required],
      proteinas: [data.proteinas, Validators.required],
      grasas: [data.grasas, Validators.required],
      sal: [data.sal, Validators.required],
      fibra: [data.fibra, Validators.required],
    });
  }
}
