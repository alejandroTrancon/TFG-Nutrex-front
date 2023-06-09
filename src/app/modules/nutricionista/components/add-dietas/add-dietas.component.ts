import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlatoInterface } from 'src/app/modules/shared/interfaces/plato.interface';
import { DietaService } from 'src/app/modules/shared/services/dieta/dieta.service';
import { LoginService } from 'src/app/modules/shared/services/login/login.service';
import { PlatoService } from 'src/app/modules/shared/services/plato/plato.service';

@Component({
  selector: 'app-add-dietas',
  templateUrl: './add-dietas.component.html',
  styleUrls: ['./add-dietas.component.css']
})
export class AddDietaComponent implements OnInit{

  public dietaForm: FormGroup;
  platos: PlatoInterface[] = [];
  momentosDia: string[] = ['Desayuno','Almuerzo','Comida','Merienda','Cena'];
  diasSemana: string[]= ['Lunes','Martes','Miercoles','Jueves','Viernes','Sábado','Domingo']

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private dietaService: DietaService,
    private platoService: PlatoService,
    private dialogRef: MatDialogRef<AddDietaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.dietaForm = this.fb.group({
        id: [''],
        platosDietas: this.fb.array([], Validators.required),
      });
  }

  ngOnInit(): void {
    this.agregarPlatos();
    this.getPlatos();
  }

  get platosDietas(): FormArray{
    return this.dietaForm.get('platosDietas') as FormArray;
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

  eliminarPlatos(index: number){
    this.platosDietas.removeAt(index);
  }

  onSave(){
    let platosDietas = this.dietaForm.get('platosDietas') as FormArray;
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

    let dieta = new FormData();  
    dieta.append('pacienteId', this.data),
    dieta.append('nutricionistaId', this.loginService.getUser().id),
    dieta.append('id', this.dietaForm.get('id')?.value);
    dieta.append('nombre', this.dietaForm.get('nombre')?.value);
    dieta.append('apellidos', this.dietaForm.get('apellidos')?.value);
    dieta.append('email', this.dietaForm.get('email')?.value);
    dieta.append('telefono', this.dietaForm.get('telefono')?.value);
    dieta.append('momentosDia', momentosDia.join(','));
    dieta.append('platos0', platos0.join(','));
    dieta.append('platos1', platos1.join(','));
    dieta.append('platos2', platos2.join(','));
    dieta.append('platos3', platos3.join(','));
    dieta.append('platos4', platos4.join(','));
    dieta.append('platos5', platos5.join(','));
    dieta.append('platos6', platos6.join(','));

    this.dietaService.saveDietaFromNutri(dieta).subscribe((data: any) => {
      this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
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
