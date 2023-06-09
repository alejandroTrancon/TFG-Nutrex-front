import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MediaMarshaller } from '@angular/flex-layout';
import { LoginService } from '../../services/login/login.service';
import { ChangeDataComponent } from '../change-data/change-data.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: "Dietas", route: "dietas", icon: "receipt"},
    {name: "Platos", route: "platos", icon: "fastfood"},
    {name: "Ingredientes", route: "ingredientes", icon: "category"},
    {name: "Usuarios", route: "usuarios", icon: "person-outline"},
  ]

  constructor(media: MediaMatcher,
        public loginService: LoginService,
        public dialog:MatDialog,
        private snackBar: MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {

    if(this.loginService.getRolUser() != "Administrador" ){
      this.menuNav = []
    }
    
  }

  public logOut() {
    this.loginService.LogOutUser();
    window.location.href='login'
  }

  public changeData(element:any){
    const dialogRef = this.dialog.open(ChangeDataComponent, {
      width:'500px',
      data: element
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result == 1){
        this.openSnackBar("Datos actualizados", "Success");
      }else if(result == 2){
        this.openSnackBar("Datos no actualizadaos", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
