import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DietaInterface } from 'src/app/modules/shared/interfaces/dieta.interface';
import { DietaService } from 'src/app/modules/shared/services/dieta/dieta.service';
import { PacienteService } from 'src/app/modules/shared/services/paciente/paciente.service';

@Component({
  selector: 'app-ver-dietas',
  templateUrl: './ver-dietas.component.html',
  styleUrls: ['./ver-dietas.component.css']
})
export class VerDietasComponent implements OnInit{

  constructor(private pacienteService: PacienteService,
    private dietaService: DietaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }

  ngOnInit(): void {
    this.listDietas();
  }

  displayColumns: string[] = ['n', 'fechaInicio', 'acciones']
  dataSource = new MatTableDataSource<DietaInterface>();

  listDietas(){
    this.pacienteService.listDietas(this.data)
        .subscribe(data => {
          this.processDietasResponse(data)
        }, (error) => {
        })
  }

  processDietasResponse(data: any){
    const DATA_DIETA: DietaInterface[] = [];

    if(data.metadata[0].code == '00' ){
      let listDietas = data.dietaResponse.dietas;

      listDietas.forEach((element: any) => {

        const fecha = new Date(element.createdAt).toISOString().split('T')[0];
  
        element.createdAt = fecha;

        DATA_DIETA.push(element);
      })
      this.dataSource = new MatTableDataSource<DietaInterface>(DATA_DIETA);
    }
  }

  generatePdf(id: any, show: boolean){
    
    this.dietaService.getPDF(id)
        .subscribe((data: any) => {
          
          const file = new Blob([data], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);

          //Abre el pdf en otra pestaña o lo descarga
          if(show){
            window.open(fileURL);
          }else{
            const a = document.createElement('a');
            a.href = fileURL;
            a.download = 'plan-dietetico.pdf'
            a.click();
          }
          
        });
  }

}
