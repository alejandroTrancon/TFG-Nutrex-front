import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IngredienteInterface } from 'src/app/modules/shared/interfaces/ingrediente.interface';
import { IngredienteService } from 'src/app/modules/shared/services/ingrediente.service';

@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent {
  constructor(private ingredienteService: IngredienteService) {

  }

  ngOnInit(): void {
    this.listIngredientes();
  }

  displayColumns: string[] = ['id', 'nombre', 'hidratos', 'proteinas', 'grasas', 'sal', 'fibra', 'acciones'];
  dataSource = new MatTableDataSource<IngredienteInterface>();

  listIngredientes() {
  this.ingredienteService.listIngredientes()
      .subscribe(data => {
        console.log("respuesta ingredientes: ", data);
        this.processIngredientesResponse(data);
      }, (error) => {
        console.log("error: ", error);
      })
  }

  processIngredientesResponse(resp: any){
    const DATA_INGREDIENTE: IngredienteInterface[] = [];

    if(resp.metadata[0].code == '00'){
      let listIngredientes = resp.ingredienteResponse.ingrediente;

      listIngredientes.forEach((element: IngredienteInterface) => {
        DATA_INGREDIENTE.push(element);
      });

      this.dataSource = new MatTableDataSource<IngredienteInterface>(DATA_INGREDIENTE);
    }

  }

}
