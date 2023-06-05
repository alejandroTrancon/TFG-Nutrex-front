import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MediaMarshaller } from '@angular/flex-layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: "Platos", route: "platos", icon: "fastfood"},
    {name: "Ingredientes", route: "ingredientes", icon: "category"},
    {name: "Usuarios", route: "usuarios", icon: "person-outline"},
    // {name: "", route: "", icon: ""},
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    
  }

}
