import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MediaMarshaller } from '@angular/flex-layout';
import { LoginService } from '../../services/login/login.service';

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
         public loginService: LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    console.log(this.loginService.getUser())

    if(this.loginService.getRolUser() != "Administrador" ){
      this.menuNav = []
    }
    
  }

  public logOut() {
    this.loginService.LogOutUser();
    window.location.href='login'
  }

}
