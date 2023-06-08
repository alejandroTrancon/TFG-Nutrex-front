import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PlatoInterface } from 'src/app/modules/shared/interfaces/plato.interface';
import { PlatoService } from 'src/app/modules/shared/services/plato/plato.service';
import { AddPlatoComponent } from '../add-plato/add-plato.component';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent {
  constructor(private platoService: PlatoService, public dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void{
    this.listPlatos();
  }

  displayColumns: string[] = ['n', 'nombre', 'receta', 'ingredientes', 'acciones'];
  dataSource = new MatTableDataSource<PlatoInterface>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  listPlatos(){
    this.platoService.listPlatos()
        .subscribe(data => {
          this.processPlatoResponse(data);
        }, (error) => {

        })
  }

  processPlatoResponse(resp: any){
    const DATA_PLATO: PlatoInterface[] = [];

    if(resp.metadata[0].code == '00'){
      let listPlatos = resp.platoResponse.platos;

      listPlatos.forEach((element: PlatoInterface) => {
        DATA_PLATO.push(element);
      });

      this.dataSource = new MatTableDataSource<PlatoInterface>(DATA_PLATO);
      this.dataSource.paginator = this.paginator;
    }
  }

  openPlatoDialog(){
    const dialogRef = this.dialog.open(AddPlatoComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Plato agregado", "Success");
        this.listPlatos();
      }else if(result == 2){
        this.openSnackBar("Plato no agregado", "Error");
      }
    })
  }

  edit(element: PlatoInterface){
    const dialogRef = this.dialog.open(AddPlatoComponent, {
      width: '500px',
      data:element
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Usuario actualizado", "Success");
        this.listPlatos();
      }else if(result == 2){
        this.openSnackBar("Usuario no actualizado", "Error");
      }
    });
  }

  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      // width: '500px',
      data: {id: id, module: "plato"}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Plato eliminado", "Success");
        this.listPlatos();
      }else if(result == 2){
        this.openSnackBar("Plato no eliminado", "Error");
      }
    });
  }

  buscar(value: string){
    if(value.length === 0){
      return this.listPlatos();
    }

    this.platoService.getPlatoByNombre(value)
                           .subscribe((resp:any) => {
                             this.processPlatoResponse(resp);
                           })
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
