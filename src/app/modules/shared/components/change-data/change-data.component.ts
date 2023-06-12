import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddUsuarioComponent } from 'src/app/modules/dashboard/modules/usuario/components/add-usuario/add-usuario.component';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-change-data',
  templateUrl: './change-data.component.html',
  styleUrls: ['./change-data.component.css']
})
export class ChangeDataComponent implements OnInit{

  public changeDataForm: FormGroup;
  public isButtonDisabled: boolean;

  constructor(private fb: FormBuilder,
        private usuarioService: UsuarioService,
        private loginService: LoginService,
        private dialogRef: MatDialogRef<AddUsuarioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any){
    this.isButtonDisabled = true;

    this.changeDataForm = this.fb.group({
      id: [data.id],
      nombre: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      apellidos: ['', Validators.compose([Validators.required, Validators.maxLength(75)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(75)])],
      telefono: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      password: [''],
      password2: [''],
    })
  }

  ngOnInit(): void {
    this.changeDataForm.valueChanges.subscribe(() => {
      this.validatePasswords();
    });
  }

  onSave(){

    let usuario = new FormData();
    usuario.append('id', this.changeDataForm.get('id')?.value);
    usuario.append('nombre', this.changeDataForm.get('nombre')?.value);
    usuario.append('apellidos', this.changeDataForm.get('apellidos')?.value);
    usuario.append('email', this.changeDataForm.get('email')?.value);
    usuario.append('telefono', this.changeDataForm.get('telefono')?.value);
    usuario.append('password', this.changeDataForm.get('password')?.value);

    this.usuarioService.changeData(usuario).subscribe((data: any) => {
      this.loginService.setUser(data.usuarioResponse.usuario[0]);
      this.dialogRef.close(1);
    }, (error: any) => {
      this.dialogRef.close(2);
    });
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  validatePasswords(): void {
    const password = this.changeDataForm.get('password')?.value;
    const password2 = this.changeDataForm.get('password2')?.value;

    this.isButtonDisabled = password !== password2;
  }


}
