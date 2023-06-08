import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlatoInterface } from 'src/app/modules/shared/interfaces/plato.interface';
import { UsuarioInterface } from 'src/app/modules/shared/interfaces/usuario.interface';
import { DietaService } from 'src/app/modules/shared/services/dieta/dieta.service';
import { PlatoService } from 'src/app/modules/shared/services/plato/plato.service';
import { UsuarioService } from 'src/app/modules/shared/services/usuario/usuario.service';

@Component({
  selector: 'app-add-dieta',
  templateUrl: './add-dieta.component.html',
  styleUrls: ['./add-dieta.component.css']
})
export class AddDietaComponent implements OnInit{

  public dietaForm: FormGroup;
  estadoFormulario: string = "Añadir";
  usuarios: UsuarioInterface[] = [];
  platos: PlatoInterface[] = [];
  momentosDia: string[] = ['Desayuno','Almuerzo','Comida','Merienda','Cena'];
  diasSemana: string[]= ['Lunes','Martes','Miercoles','Jueves','Viernes','Sábado','Domingo']

  constructor(private fb: FormBuilder,
    private dietaService: DietaService,
    private platoService: PlatoService,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<AddDietaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){


    this.dietaForm = this.fb.group({
      id: [''],
      nutricionista: ['', Validators.required],
      paciente: ['', Validators.required],
      platosDietas: this.fb.array([], Validators.required),
    });

    if(data != null){
      this.updateForm(data);
      this.estadoFormulario = "Actualizar";
    }
  }

  ngOnInit(): void{
    if(this.estadoFormulario !== "Actualizar"){
      this.agregarPlatos();
    }

   this.getUsuarios();
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

    dieta.append('id', this.dietaForm.get('id')?.value);
    dieta.append('nutricionista', this.dietaForm.get('nutricionista')?.value);
    dieta.append('paciente', this.dietaForm.get('paciente')?.value);
    dieta.append('momentosDia', momentosDia.join(','));
    dieta.append('platos0', platos0.join(','));
    dieta.append('platos1', platos1.join(','));
    dieta.append('platos2', platos2.join(','));
    dieta.append('platos3', platos3.join(','));
    dieta.append('platos4', platos4.join(','));
    dieta.append('platos5', platos5.join(','));
    dieta.append('platos6', platos6.join(','));

    if (dieta.get('id') != ""){
      this.dietaService.updateDieta(dieta, dieta.get('id')).subscribe( (data: any) => {
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    } else {
      this.dietaService.saveDieta(dieta).subscribe( (dieta: any) => {
        this.dialogRef.close(1);
      }, (error: any) => {
        this.dialogRef.close(2);
      });
    }

  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data:any){
    const dataPlatos = data.platos;
    const dataMomentosDia = data.momentosDia;

    const dataPlatosDieta = this.dietaForm.get('platosDietas') as FormArray;

    
    this.eliminarPlatos(1);
    for(let i = 0; i < dataMomentosDia.length; i+=7){
      
      const momentoDia = dataMomentosDia[i];      
      const platoFormGroup = this.fb.group({

        momentoDia: [this.momentosDia.indexOf(momentoDia)],
        plato0: [dataPlatos[i].id],
        plato1: [dataPlatos[i+1].id],
        plato2: [dataPlatos[i+2].id],
        plato3: [dataPlatos[i+3].id],
        plato4: [dataPlatos[i+4].id],
        plato5: [dataPlatos[i+5].id],
        plato6: [dataPlatos[i+6].id]
      });
      dataPlatosDieta.push(platoFormGroup)
    }

      this.dietaForm = this.fb.group({
        id: [data.id],
        nutricionista: [data.nutricionista.id],
        paciente: [data.paciente.id],
        platosDietas: dataPlatosDieta
      });
  }

  getPlatos(){
    this.platoService.listPlatos()
    .subscribe((data: any) => {
      this.platos = data.platoResponse.platos;
    })
  }

  getUsuarios():void{
    this.usuarioService.listUsuarios()
        .subscribe((data: any) => {
          this.usuarios = data.usuarioResponse.usuario;
        }, (error:any) =>{})
  }

}
