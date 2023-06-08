import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { AddUsuarioComponent } from '../add-usuario/add-usuario.component';
import { UsuarioService } from 'src/app/modules/shared/services/usuario/usuario.service';
import { UsuarioInterface } from 'src/app/modules/shared/interfaces/usuario.interface';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  constructor(private usuarioService: UsuarioService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar){
    }

  ngOnInit():void {
    this.listUsuarios();
  }

  displayColumns: string[] = ['n', 'apellidos', 'nombre', 'email', 'telefono', 'rol', 'activo', 'bloqueado', 'acciones']
  dataSource = new MatTableDataSource<UsuarioInterface>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  listUsuarios() {
    this.usuarioService.listUsuarios()
        .subscribe(data => {
          this.processUsuariosResponse(data);
        }, (error) => {
        })
  }

  processUsuariosResponse(resp: any){
    const DATA_USUARIO: UsuarioInterface[] = [];

    if(resp.metadata[0].code == '00'){
      let listUsuarios = resp.usuarioResponse.usuario;

      listUsuarios.forEach((element: UsuarioInterface) => {
        DATA_USUARIO.push(element);
      })

      this.dataSource = new MatTableDataSource<UsuarioInterface>(DATA_USUARIO);
      this.dataSource.paginator = this.paginator;

    }
  }

  openUsuarioDialog(){
    const dialogRef = this.dialog.open(AddUsuarioComponent , {
      width: '500px' 
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Usuario agregado", "Success");
        this.listUsuarios();
      }else if(result == 2){
        this.openSnackBar("Usuario no agregado", "Error");
      }
    });

  }

  buscar(value:string){
    if(value.length === 0){
      return this.listUsuarios();
    }

    this.usuarioService.getUsuarioByEmail(value)
                       .subscribe((resp:any) => {
                          this.processUsuariosResponse(resp);
                       })
  }

  edit(element: UsuarioInterface){
    const dialogRef = this.dialog.open(AddUsuarioComponent, {
      width: '500px',
      data: element
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Usuario actualizado", "Success");
        this.listUsuarios();
      }else if(result == 2){
        this.openSnackBar("Usuario no actualizado", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: {id: id, module: "usuario"}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Usuario eliminado", "Success");
        this.listUsuarios();
      }else if(result == 2){
        this.openSnackBar("Usuario no eliminado", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    });
    
  }

}
