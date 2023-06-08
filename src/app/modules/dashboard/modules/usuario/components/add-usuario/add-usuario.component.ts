import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolInterface } from 'src/app/modules/shared/interfaces/rol.interface';
import { RolService } from 'src/app/modules/shared/services/rol/rol.service';
import { UsuarioService } from 'src/app/modules/shared/services/usuario/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit{
  public usuarioForm: FormGroup;
  estadoFormulario: string = "Añadir";
  roles: RolInterface[]=[];

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
              private rolService: RolService,
              private dialogRef: MatDialogRef<AddUsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){
  
    this.usuarioForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
      activo: [],
      bloqueado: [],
      rol: ['', Validators.required],

    })

    if(data != null){
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";
    }
  }

  ngOnInit(): void {
    this.getRoles()
  }

  onSave(){
    let activo: string;
    let bloqueado: string;

    if (this.usuarioForm.get('activo')?.value === null){
      activo = "false";
    }else{
      activo = this.usuarioForm.get('activo')?.value;
    }

    if (this.usuarioForm.get('bloqueado')?.value === null){
      bloqueado = "false";
    }else{
      bloqueado = this.usuarioForm.get('bloqueado')?.value;
    }


    // this.usuarioForm.get('activo')?.value === null ? activo = "true" :  activo = "false";
    // this.usuarioForm.get('bloqueado')?.value === null ? bloqueado = "true" :  bloqueado = "false";
    
    let usuario = new FormData();
    usuario.append('id', this.usuarioForm.get('id')?.value);
    usuario.append('nombre', this.usuarioForm.get('nombre')?.value);
    usuario.append('apellidos', this.usuarioForm.get('apellidos')?.value);
    usuario.append('email', this.usuarioForm.get('email')?.value);
    usuario.append('telefono', this.usuarioForm.get('telefono')?.value);
    usuario.append('password', this.usuarioForm.get('password')?.value);
    usuario.append('activo', activo);
    usuario.append('bloqueado', bloqueado);
    usuario.append('rol', this.usuarioForm.get('rol')?.value);

    if(usuario.get('id') != ""){
      this.usuarioService.updateIngrediente(usuario, usuario.get('id')).subscribe( (data: any) => {
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    }else{
      this.usuarioService.saveUsuario(usuario).subscribe((data: any) => {
        this.dialogRef.close(1);
      }, (error: any) => {
         this.dialogRef.close(2);
      });
    }

    
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data:any) {
    this.usuarioForm = this.fb.group({
      id: [data.id, Validators.required],
      nombre: [data.nombre, Validators.required],
      apellidos: [data.apellidos, Validators.required],
      email: [data.email, Validators.required],
      telefono: [data.telefono, Validators.required],
      password: [''],
      activo: [data.activo],
      bloqueado: [data.bloqueado],
      rol: [data.rol.id, Validators.nullValidator],
    });
  }

  getRoles(){
    this.rolService.listRoles()
        .subscribe((data: any) => {
          this.roles = data.rolResponse.rol           
        }, (error: any) => {

        })
  }

}
