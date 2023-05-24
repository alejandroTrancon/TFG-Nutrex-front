import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IngredienteService } from '../../services/ingrediente/ingrediente.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
              @Inject (MAT_DIALOG_DATA) public data: any,
              private ingredienteService: IngredienteService){

  }

  ngOnInit(): void{

  }

  noDelete(){
    this.dialogRef.close(3);
  }

  delete(){
    if (this.data != null) {
      this.ingredienteService.deleteIngrediente(this.data)
          .subscribe( (data:any) => {
            this.dialogRef.close(1);
          }, (error: any) => {
            this.dialogRef.close(2);
          })
    } else {
      this.dialogRef.close(2);
    }
  }

}
