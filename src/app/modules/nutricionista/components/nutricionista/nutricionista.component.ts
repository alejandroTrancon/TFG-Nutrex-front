import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioInterface } from 'src/app/modules/shared/interfaces/usuario.interface';
import { LoginService } from 'src/app/modules/shared/services/login/login.service';
import { NutricionistaService } from 'src/app/modules/shared/services/nutricionista/nutricionista.service';
import { AddPacienteComponent } from '../add-paciente/add-paciente.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { VerDietasComponent } from '../ver-dietas/ver-dietas.component';
import { AddDietaComponent } from '../add-dietas/add-dietas.component';

@Component({
  selector: 'app-nutricionista',
  templateUrl: './nutricionista.component.html',
  styleUrls: ['./nutricionista.component.css']
})
export class NutricionistaComponent implements OnInit{

  constructor(private nutricionistaService: NutricionistaService,
        public dialog: MatDialog,
        public loginService: LoginService,
        private snackBar: MatSnackBar){
    
  }

  ngOnInit(): void {
    this.listPacientes();
  }

  displayColumns: string[] = ['n', 'apellidos', 'nombre', 'email', 'telefono', 'acciones']
  dataSource = new MatTableDataSource<UsuarioInterface>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  listPacientes(){
    this.nutricionistaService.listPacientes(this.loginService.getUser().id)
        .subscribe(data => {
          this.processUsuarioResponse(data)
        })
  }

  processUsuarioResponse(data: any){
    const DATA_PACIENTE: UsuarioInterface[] = [];

    if(data.metadata[0].code == '00'){
      let listPacientes = data.usuarioResponse.usuario;

      listPacientes.forEach((element: UsuarioInterface) => {
        DATA_PACIENTE.push(element);
      })
      this.dataSource = new MatTableDataSource<UsuarioInterface>(DATA_PACIENTE);
      this.dataSource.paginator = this.paginator;
    }
  }

  addPaciente(){
    const dialogRef = this.dialog.open(AddPacienteComponent, {
      width: '1000px'
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Paciente agregado", "Success");
        this.listPacientes();
      }else if(result == 2){
        this.openSnackBar("Paciente no agregado", "Error");
      }
    });
  }

  buscar(value:string){
    if(value.length === 0){
      return this.listPacientes();
    }

    this.nutricionistaService.getPacientes(this.loginService.getUser().id, value)
        .subscribe(data => {
          this.processUsuarioResponse(data)
        })
  }

  verDietas(id: number){
    const dialogRef = this.dialog.open(VerDietasComponent, {
      width: '500px',
      data: id
    })
  }

  addDieta(id: number){
    const dialogRef = this.dialog.open(AddDietaComponent, {
      width: '1000px',
      data: id
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Dieta agregada", "Success");
        this.listPacientes();
      }else if(result == 2){
        this.openSnackBar("Dieta no agregada", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    });

  }
}
