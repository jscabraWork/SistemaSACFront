import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudesService } from '../services/solicitudes.service';
import { CambioSolicitud, EstadoSolicitud, Respuesta, Solicitud } from '../models/solicitud.model';
import { RespuestaService } from '../services/respuesta.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-responder-solicitud',
  imports: [FormsModule, NgIf, NgFor, DatePipe, ReactiveFormsModule, NgClass],
  templateUrl: './responder-solicitud.component.html',
  styleUrl: './responder-solicitud.component.css',
  standalone: true
})
export class ResponderSolicitudComponent implements OnInit {

  solicitudes: Solicitud[];
  respuestas: Respuesta[];
  cambios:CambioSolicitud[];

  idEstadoActual=1;

  estados: EstadoSolicitud[] = [
    { es_id: 1, es_nombre_estado: 'Radicado' },
    { es_id: 2, es_nombre_estado: 'En Proceso' },
    { es_id: 3, es_nombre_estado: 'Resuelto' },
    { es_id: 4, es_nombre_estado: 'En Revisión' },
    { es_id: 5, es_nombre_estado: 'Escalado' }
  ];

  constructor(private service: SolicitudesService, private respuestaService: RespuestaService, private auth: AuthService) {

  }

  ngOnInit(): void {
    
    this.busquedaDeSolciitudes(this.idEstadoActual);

  }

  busquedaDeSolciitudes(estado){
    this.idEstadoActual=estado
    this.respuestas = []
    this.cambios=[]
    this.service.getSolicitudesPorColaborador(Number(this.auth.getAgenteId()), this.idEstadoActual).subscribe({
      next: response => {
        this.solicitudes = response
        for (let i = 0; i < this.solicitudes.length; i++) {
          let s = this.solicitudes[i]
          let respuesta = new Respuesta();
          respuesta.so_id = s.so_id;
          respuesta.so_es_id = s.so_es_id;
          respuesta.so_col_id = Number(this.auth.getAgenteId());
          respuesta.so_respuesta = s.so_respuesta;
          respuesta.so_col_id_colaborador_modificacion = Number(this.auth.getAgenteId())




          let cambio = new CambioSolicitud();
          cambio.so_id = s.so_id;
          cambio.so_es_id = s.so_es_id;
          cambio.so_col_id = Number(this.auth.getAgenteId());
          cambio.so_col_id_colaborador_modificacion = Number(this.auth.getAgenteId());
          console.log(cambio)

        
          this.cambios.push(cambio)

          
          this.respuestas.push(respuesta)
        }
      }, error: error => {
        alert('Sucedio un error')
      }
    })
  }

  responderSolicitud(i) {


    if (this.respuestas[i].so_respuesta)
      this.respuestaService.responderSolicitud(this.respuestas[i]).subscribe({
        next: response => {
          alert("Respondido exitosamente")
          console.log(response)

        }, error: error => {
          console.log(error)
          alert("Responde nuevamente");
        }
      })
  }


  cambiarEstadoSolicitud(i) {

    if(this.cambios[i].so_es_id==5){
      this.cambios[i].so_col_id = Number( this.auth.getLiderId())
    }


    this.respuestaService.responderSolicitud(this.cambios[i]).subscribe({
      next: response => {
        alert("Cambio de estado exitoso")
        this.ngOnInit()
        console.log(response)
      }, error: error => {
        console.log(error)
        alert("Responde nuevamente");
      }
    })
  }
}
