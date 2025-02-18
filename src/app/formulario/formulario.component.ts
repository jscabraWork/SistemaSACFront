import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../models/solicitud.model';
import { SolicitudesService } from '../services/solicitudes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
  imports:[FormsModule ]
})
export class FormularioComponent implements OnInit{

  solicitud:Solicitud

  constructor(private service:SolicitudesService){

  }

  ngOnInit(): void {
      this.solicitud = new Solicitud();
  }

  crearSolicitud(){
    this.service.crearSolicitud(this.solicitud).subscribe({next:response=>{
      alert(`Solicitud ${response.numero} creada con exito`);
    },
    error:error=>{
      error
      alert("Sucedio un error al crear la solicitud")
    }
  });
  }
}
