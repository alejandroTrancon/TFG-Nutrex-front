import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../shared/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public logInForm: FormGroup;
  

  constructor(private fb: FormBuilder,
        private loginService: LoginService,
        private snack: MatSnackBar,
        ) {

    
    this.logInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]

    });

  }

  ngOnInit(): void {

  }

  formSubmit(){
    let data = {
      email: this.logInForm.get('email')?.value,
      password: this.logInForm.get('password')?.value,
    }

    this.loginService.generateToken(data).subscribe((data:any) => {
      this.loginService.logInUser(data.token);
      this.loginService.getCurrentUser().subscribe((user:any) => {
        this.loginService.setUser(user);

        switch(this.loginService.getRolUser()){
          case "Administrador":
            window.location.href = '/dashboard';
            this.loginService.loginStatusSubject.next(true);
            break;
          case "Paciente":
            window.location.href = 'misDietas';            
            this.loginService.loginStatusSubject.next(true);
            break;
          case "Nutricionista":
            window.location.href = '/misPacientes';          
            this.loginService.loginStatusSubject.next(true);
            break;
          default:
            this.loginService.LogOutUser();
            window.location.href = '/login';
          
        }
      })
    },(error) => {
      this.snack.open('Usuario inválido', 'Aceptar', {
        duration: 2000
      })
    });
  }


}
