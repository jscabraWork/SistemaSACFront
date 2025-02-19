import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../models/solicitud.model';
import { SolicitudesService } from '../services/solicitudes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
  imports:[FormsModule ],
  standalone:true
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
      alert(`Solicitud ${response.numero} creada con éxito`);
    },
    error:error=>{
      error
      alert("Sucedió un error al crear la solicitud")
    }
  });
  }
}
