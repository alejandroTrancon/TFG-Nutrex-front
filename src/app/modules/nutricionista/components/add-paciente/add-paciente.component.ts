import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PlatoInterface } from 'src/app/modules/shared/interfaces/plato.interface';
import { LoginService } from 'src/app/modules/shared/services/login/login.service';
import { PacienteService } from 'src/app/modules/shared/services/paciente/paciente.service';
import { PlatoService } from 'src/app/modules/shared/services/plato/plato.service';

@Component({
  selector: 'app-add-paciente',
  templateUrl: './add-paciente.component.html',
  styleUrls: ['./add-paciente.component.css']
})
export class AddPacienteComponent implements OnInit{
  public pacienteDietaForm: FormGroup;
  platos: PlatoInterface[] = [];
  momentosDia: string[] = ['Desayuno','Almuerzo','Comida','Merienda','Cena'];
  diasSemana: string[]= ['Lunes','Martes','Miercoles','Jueves','Viernes','Sábado','Domingo']

  constructor(private fb: FormBuilder,
        private pacienteService: PacienteService,
        private dialogRef: MatDialogRef<AddPacienteComponent>,
        private platoService: PlatoService,
        private loginService: LoginService
    ){
    this.pacienteDietaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      platosDietas: this.fb.array([], Validators.required),
    })
  }

  ngOnInit(): void {
    this.agregarPlatos();
    this.getPlatos();
  }

  get platosDietas(): FormArray{
    return this.pacienteDietaForm.get('platosDietas') as FormArray;
  }

  agregarPlatos(){
    const platosDietasFormGroup = this.fb.group({
      momentoDia: ['', Validators.required],
      plato0: ['', Validators.required],
      plato1: ['', Validators.required],
      plato2: ['', Validators.required],
      plato3: ['', Validators.required],
      plato4: ['', Validators.required],
      plato5: ['', Validators.required],
      plato6: ['', Validators.required],
    })

    this.platosDietas.push(platosDietasFormGroup);
  }

  onSave(){
    let platosDietas = this.pacienteDietaForm.get('platosDietas') as FormArray;
    let platos0 = [];
    let platos1 = [];
    let platos2 = [];
    let platos3 = [];
    let platos4 = [];
    let platos5 = [];
    let platos6 = [];
    let momentosDia = [];

    for (let i = 0 ; i < platosDietas.length; i++){
      let momentoDia = platosDietas.at(i).get('momentoDia')?.value;
      let plato0 = platosDietas.at(i).get('plato0')?.value;
      let plato1 = platosDietas.at(i).get('plato1')?.value;
      let plato2 = platosDietas.at(i).get('plato2')?.value;
      let plato3 = platosDietas.at(i).get('plato3')?.value;
      let plato4 = platosDietas.at(i).get('plato4')?.value;
      let plato5 = platosDietas.at(i).get('plato5')?.value;
      let plato6 = platosDietas.at(i).get('plato6')?.value;

      momentosDia.push(momentoDia);
      platos0.push(plato0);
      platos1.push(plato1);
      platos2.push(plato2);
      platos3.push(plato3);
      platos4.push(plato4);
      platos5.push(plato5);
      platos6.push(plato6);
    }

    let paciente = new FormData();  
    paciente.append('nutricionistaId', this.loginService.getUser().id),
    paciente.append('id', this.pacienteDietaForm.get('id')?.value);
    paciente.append('nombre', this.pacienteDietaForm.get('nombre')?.value);
    paciente.append('apellidos', this.pacienteDietaForm.get('apellidos')?.value);
    paciente.append('email', this.pacienteDietaForm.get('email')?.value);
    paciente.append('telefono', this.pacienteDietaForm.get('telefono')?.value);
    paciente.append('momentosDia', momentosDia.join(','));
    paciente.append('platos0', platos0.join(','));
    paciente.append('platos1', platos1.join(','));
    paciente.append('platos2', platos2.join(','));
    paciente.append('platos3', platos3.join(','));
    paciente.append('platos4', platos4.join(','));
    paciente.append('platos5', platos5.join(','));
    paciente.append('platos6', platos6.join(','));

    this.pacienteService.savePaciente(paciente).subscribe((data: any) => {
      this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
  }

  eliminarPlatos(index: number){
    this.platosDietas.removeAt(index);
  }
  

  onCancel(){
    this.dialogRef.close(3);
  }

  getPlatos(){
    this.platoService.listPlatos()
    .subscribe((data: any) => {
      this.platos = data.platoResponse.platos;
    })
  }

}
