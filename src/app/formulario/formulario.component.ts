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
    console.log(this.solicitud)
    this.service.crearSolicitud(this.solicitud).subscribe({next:response=>{
      console.log(response)
      alert(`Solicitud ${response.body.so_numero_solicitud} creada con éxito`);
    },
    error:error=>{
      console.log(error)
      alert("Sucedió un error al crear la solicitud")
    }
  });
  }
}
