import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Solicitud } from '../models/solicitud.model';
import { SolicitudesService } from '../services/solicitudes.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-consultar-solicitud',
  imports: [FormsModule, NgFor, DatePipe, NgIf],
  templateUrl: './consultar-solicitud.component.html',
  styleUrl: './consultar-solicitud.component.css',
  standalone:true
})
export class ConsultarSolicitudComponent implements OnInit{

  noRadico:string;
  correo:string
  solicitudes:Solicitud[];
  tipoBusqueda:number
  buscando:boolean


  constructor(private solicitudService:SolicitudesService){

  }

  ngOnInit(): void {
    this.reiniciar();
    this.tipoBusqueda=-1;
    this.buscando=false;

  }

  reiniciar(){
    this.correo=""
    this.noRadico=""
    this.solicitudes=[]
  }

  buscarSolicitud(){

    if(this.buscando==false){
      this.buscando=true
      if(this.tipoBusqueda==0){
        this.solicitudService.getSolicitudPorRadicado(this.noRadico).subscribe({next:response=>{
          this.solicitudes= response;
          console.log(response)
          
          this.buscando=false
        },error:error=>{
          alert("Sucedio un error, por favor vuelva a intentar")
          this.buscando=false
        }});
      }
      else if(this.tipoBusqueda==1){
        this.solicitudService.getSolicitudesPorEmail(this.correo).subscribe({next:response=>{
          this.solicitudes= response;
          this.buscando=false
  
        },error:error=>{
          alert("Sucedio un error, por favor vuelva a intentar")
          this.buscando=false
        }});  
      }
    }
    else if(this.buscando){
      alert("Buscando...")
    }
   

  }

}
