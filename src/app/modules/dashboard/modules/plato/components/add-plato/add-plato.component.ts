import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IngredienteInterface } from 'src/app/modules/shared/interfaces/ingrediente.interface';
import { IngredienteService } from 'src/app/modules/shared/services/ingrediente/ingrediente.service';
import { PlatoService } from 'src/app/modules/shared/services/plato/plato.service';

@Component({
  selector: 'app-add-plato',
  templateUrl: './add-plato.component.html',
  styleUrls: ['./add-plato.component.css']
})
export class AddPlatoComponent implements OnInit{

  public platoForm: FormGroup;
  estadoFormulario: string = "Añadir";
  ingredientes: IngredienteInterface[]=[];
  
  constructor(private fb: FormBuilder,
    private platoService: PlatoService,
    private ingredienteService: IngredienteService,
    private dialogRef: MatDialogRef<AddPlatoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){


    this.platoForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      receta: ['', Validators.required],
      ingredientesPlatos: this.fb.array([], Validators.required),
    });

    if(data != null){
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";
    }
  }

    ngOnInit(): void {
      if(this.estadoFormulario !== "Actualizar"){
        this.agregarIngrediente();
      }
      
      this.getIngredientes();
    }

    get ingredientesPlatos(): FormArray {
      return this.platoForm.get('ingredientesPlatos') as FormArray;
    }

    agregarIngrediente(){
      const ingredientePlatoFormGroup = this.fb.group({
        ingrediente: ['', Validators.required],
        cantidad: ['', Validators.required],
      })

      this.ingredientesPlatos.push(ingredientePlatoFormGroup)
    }

    eliminarIngrediente(index: number){
      this.ingredientesPlatos.removeAt(index);
    }
    

    onSave(){

      let ingredientesPlatos = this.platoForm.get('ingredientesPlatos') as FormArray;
      let ingredientes = [];
      let cantidades = [];
    
      for (let i = 0; i < ingredientesPlatos.length; i++) {
        let ingrediente = ingredientesPlatos.at(i).get('ingrediente')?.value;
        let cantidad = ingredientesPlatos.at(i).get('cantidad')?.value;
    
        ingredientes.push(ingrediente);
        cantidades.push(cantidad);
      }
    
      let plato = new FormData();
      plato.append('id', this.platoForm.get('id')?.value);
      plato.append('nombre', this.platoForm.get('nombre')?.value);
      plato.append('receta', this.platoForm.get('receta')?.value);
      plato.append('ingredientes', ingredientes.join(','));
      plato.append('cantidades', cantidades.join(','));


      if(plato.get('id') != ""){
        this.platoService.updatePlato(plato, plato.get('id')).subscribe( (data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        });
      } else {
        this.platoService.savePlato(plato).subscribe( (plato: any) => {
          console.log(plato);
          this.dialogRef.close(1);
        }, (error: any) => {
          console.log(plato);
          this.dialogRef.close(2);
        });
      }
    }

    onCancel(){
      this.dialogRef.close(3);
    }

    updateForm(data:any){
      const dataIngredientes = data.ingredientes;
      const dataCantidades = data.cantidades;

      const dataIngredientesPlatos = this.platoForm.get('ingredientesPlatos') as FormArray;

      this.eliminarIngrediente(1);
      for(let i = 0; i < dataIngredientes.length; i++){
        const ingredientFormGroup = this.fb.group({
          ingrediente: [dataIngredientes[i].id],
          cantidad: [dataCantidades[i]]
        });
      
        dataIngredientesPlatos.push(ingredientFormGroup);
      }


      this.platoForm = this.fb.group({
        id: [data.id],
        nombre: [data.nombre, Validators.required],
        receta: [data.receta, Validators.required],
        ingredientesPlatos: dataIngredientesPlatos,
      });
    }

    getIngredientes(){
      this.ingredienteService.listIngredientes()
          .subscribe((data:any) => {
            this.ingredientes = data.ingredienteResponse.ingrediente;
          }, (error:any) => {

          })
      
    }

}
