import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DietaInterface } from 'src/app/modules/shared/interfaces/dieta.interface';
import { DietaService } from 'src/app/modules/shared/services/dieta/dieta.service';
import { AddDietaComponent } from '../add-dieta/add-dieta.component';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.component.html',
  styleUrls: ['./dieta.component.css']
})
export class DietaComponent {
  constructor(private dietaService: DietaService, public dialog:MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit():void {
    this.listDietas();
  }

  displayColumns: string[] = ['n', 'nutricionista', 'paciente', 'acciones'];
  dataSource = new MatTableDataSource<DietaInterface>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  listDietas(){
    this.dietaService.listDietas()
        .subscribe(data => {
          this.processDietaResponde(data);
        }, (error) => {

        });
  }

  processDietaResponde(resp: any){
    const DATA_DIETA: DietaInterface[] = [];

    if(resp.metadata[0].code == '00'){
      let listDietas = resp.dietaResponse.dietas;

      listDietas.forEach((element: DietaInterface) => {
        DATA_DIETA.push(element);
      })

      this.dataSource = new MatTableDataSource<DietaInterface>(DATA_DIETA);
      this.dataSource.paginator = this.paginator;
    }
  } 

  openDietaDialog(){
    const dialogRef = this.dialog.open(AddDietaComponent, {
      width: '500px'
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Dieta agregada", "Success");
        this.listDietas();
      }else if(result == 2){
        this.openSnackBar("Dieta no agregada", "Error");
      }
    });
  }
  
  edit(element: DietaInterface){
    const dialogRef = this.dialog.open(AddDietaComponent, {
      width: '500px',
      data:element
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Dieta actualizada", "Success");
        this.listDietas();
      }else if(result == 2){
        this.openSnackBar("Dieta no actualizada", "Error");
      }
    });
  }
  
  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      // width: '500px',
      data: {id: id, module: "dieta"}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Dieta eliminada", "Success");
        this.listDietas();
      }else if(result == 2){
        this.openSnackBar("Dieta no eliminada", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
