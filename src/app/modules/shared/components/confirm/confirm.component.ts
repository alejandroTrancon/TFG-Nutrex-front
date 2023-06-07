import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { PlatoService } from '../../services/plato/plato.service';
import { DietaService } from '../../services/dieta/dieta.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
              @Inject (MAT_DIALOG_DATA) public data: any,
              private ingredienteService: IngredienteService,
              private usuarioService: UsuarioService,
              private platoService: PlatoService,
              private dietaService: DietaService){

  }

  ngOnInit(): void{

  }

  noDelete(){
    this.dialogRef.close(3);
  }

  delete(){
    switch(this.data.module){
      case "usuario":
        if (this.data != null) {
          this.usuarioService.deleteUsuario(this.data.id)
              .subscribe( (data:any) => {
                this.dialogRef.close(1);
              }, (error: any) => {
                this.dialogRef.close(2);
              })
        } else {
          this.dialogRef.close(2);
        }
        break;
      case "ingrediente":
        if (this.data != null) {
          this.ingredienteService.deleteIngrediente(this.data.id)
              .subscribe( (data:any) => {
                this.dialogRef.close(1);
              }, (error: any) => {
                this.dialogRef.close(2);
              })
        } else {
          this.dialogRef.close(2);
        }
        break;
      case "plato":
        if (this.data != null) {
          this.platoService.deletePlato(this.data.id)
              .subscribe( (data:any) => {
                this.dialogRef.close(1);
              }, (error: any) => {
                this.dialogRef.close(2);
                console.log(error);
              })
        } else {
          this.dialogRef.close(2);
        }
        break;
        case "dieta":
          if (this.data != null) {
            this.dietaService.deleteDieta(this.data.id)
                .subscribe( (data:any) => {
                  this.dialogRef.close(1);
                }, (error: any) => {
                  this.dialogRef.close(2);
                  console.log(error);
                })
          } else {
            this.dialogRef.close(2);
          }
          break;
    }
    
  }

}
