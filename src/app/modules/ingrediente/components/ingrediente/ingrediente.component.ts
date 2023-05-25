import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IngredienteInterface } from 'src/app/modules/shared/interfaces/ingrediente.interface';
import { IngredienteService } from 'src/app/modules/shared/services/ingrediente/ingrediente.service';
import { AddIngredienteComponent } from '../add-ingrediente/add-ingrediente.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent {
  constructor(private ingredienteService: IngredienteService, public dialog: MatDialog,
              private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.listIngredientes();
  }

  displayColumns: string[] = ['n', 'nombre', 'hidratos', 'proteinas', 'grasas', 'sal', 'fibra', 'acciones'];
  dataSource = new MatTableDataSource<IngredienteInterface>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  listIngredientes() {
  this.ingredienteService.listIngredientes()
      .subscribe(data => {
        console.log("respuesta ingredientes: ", data);
        this.processIngredientesResponse(data);
      }, (error) => {
        console.log("error: ", error);
      })
  }

  processIngredientesResponse(resp: any){
    const DATA_INGREDIENTE: IngredienteInterface[] = [];

    if(resp.metadata[0].code == '00'){
      let listIngredientes = resp.ingredienteResponse.ingrediente;

      listIngredientes.forEach((element: IngredienteInterface) => {
        DATA_INGREDIENTE.push(element);
      });

      this.dataSource = new MatTableDataSource<IngredienteInterface>(DATA_INGREDIENTE);
      this.dataSource.paginator = this.paginator;
    }

  }

  openIngredienteDialog(){
    const dialogRef = this.dialog.open(AddIngredienteComponent , {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Ingrediente agregado", "Success");
        this.listIngredientes();
      }else if(result == 2){
        this.openSnackBar("Ingrediente no agregado", "Error");
      }
    });
  }

  edit(element: IngredienteInterface){
    const dialogRef = this.dialog.open(AddIngredienteComponent , {
      width: '500px',
      data: element
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Ingrediente actualizado", "Success");
        this.listIngredientes();
      }else if(result == 2){
        this.openSnackBar("Ingrediente no actualizado", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      // width: '500px',
      data: {id: id, module: "ingrediente"}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Ingrediente eliminado", "Success");
        this.listIngredientes();
      }else if(result == 2){
        this.openSnackBar("Ingrediente no eliminado", "Error");
      }
    });
  }

  buscar(value: string){
    if(value.length === 0){
      return this.listIngredientes();
    }

    this.ingredienteService.getIngredienteByName(value)
                           .subscribe((resp:any) => {
                             this.processIngredientesResponse(resp);
                           })

  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    });
    
  }

}
