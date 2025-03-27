import { Component, OnInit } from '@angular/core';
import { SolicitudesService } from '../services/solicitudes.service';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { SolicitudCreacion } from '../models/creaciones.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Solicitud } from '../models/solicitud.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
  imports: [FormsModule, NgIf, NgFor],
  standalone: true
})
export class FormularioComponent implements OnInit {

  solicitud: SolicitudCreacion

  creando: boolean

  imagesSrc: any[];
  selectedFiles: FileList;
  filename = '';
  selectedFileName: string = '';
  buscando:boolean
  noRadico:string;

  constructor(private service: SolicitudesService) {

  }

  ngOnInit(): void {
    this.solicitud = new SolicitudCreacion();
    this.solicitud.usuario.us_tu_id=1
    this.creando = false
    this.solicitud.so_es_id = 1
    this.selectedFiles = null;
    this.imagesSrc = [];
    this.buscando=false
  }

  crearSolicitud() {
    this.creando = true
    if(this.imagesSrc.length>0){

      this.service.crearSolicitud(this.solicitud, this.selectedFiles).subscribe({
        next:  (response) => {

            this.creando = false;
            console.log(response);
            alert(`Solicitud ${response.so_numero_solicitud} creada con éxito`);
          
        },
        error: (error) => {
          console.log(error);
          this.creando = false;
        alert(
            'Sucedió un error al crear la solicitud'
          );
        },
      });

    }
    else{
      this.service.crearSolicitud(this.solicitud).subscribe({
        next: response => {
          console.log(response)
          this.creando = false
          alert(`Solicitud ${response.so_numero_solicitud} creada con éxito`);
          this.ngOnInit()
        },
        error: error => {
          console.log(error)
          this.creando = false
          alert("Sucedió un error al crear la solicitud")
        }
      });
    }
 
  }


  buscarSolicitud(){
    if(this.buscando==false){
      this.service.getSolicitudPorRadicado(this.noRadico).subscribe({next:response=>{
        this.solicitud= this.toSolicitudCreacion(response[0]);
        console.log(response)
        
        this.buscando=false
      },error:error=>{
        alert("Sucedio un error, por favor vuelva a intentar")
        this.buscando=false
      }});
    }
  }


  selectFiles(event) {
    this.selectedFiles = null;
    this.imagesSrc = [];
    event.target.files.length == 1
      ? (this.filename = event.target.files[0].name)
      : (this.filename = event.target.files.length + ' archivos');

    const files = event.target.files;

    if (files.length > 0) {
      const nuevoNombre = this.generarLetrasAleatorias() + files[0].name;
      const archivoModificado = new File([files[0]], nuevoNombre, {
        type: files[0].type,
      });

      if (this.selectedFiles === null) {
        this.selectedFiles = new DataTransfer().files;
      }

      const allFiles = Array.from(this.selectedFiles).concat([
        archivoModificado,
      ]);
      const combinedFiles = this.createFileList(allFiles);
      this.selectedFiles = combinedFiles;

      console.log(this.selectedFiles);
      this.imagesSrc.push(this.filename);
    }

    this.selectedFileName = this.filename;

    const reader = new FileReader();
    let src;
    reader.onload = (e) => {
      src = reader.result;
    };
    reader.readAsDataURL(this.selectedFiles[0]);
  }

  private createFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer();

    files.forEach((file) => {
      dataTransfer.items.add(file);
    });

    return dataTransfer.files;
  }


  generarLetrasAleatorias() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let letrasGeneradas = '';

    for (let i = 0; i < 5; i++) {
      const indiceAleatorio = this.obtenerIndiceAleatorio(letras.length);
      letrasGeneradas += letras.charAt(indiceAleatorio);
    }

    return letrasGeneradas;
  }

  private obtenerIndiceAleatorio(max: number): number {
    return Math.floor(Math.random() * max);
  }


  toSolicitudCreacion(solicitud: Solicitud): SolicitudCreacion {
    return {
      so_descripcion: solicitud.so_descripcion,
      so_ts_id:  5,
      so_es_id: solicitud.so_es_id,
      so_so_id: solicitud.so_id,
      usuario: {
        us_nombre: solicitud.usuarios.us_nombre,
        us_apellido: solicitud.usuarios.us_apellido,
        us_ti_id: solicitud.usuarios.us_ti_id ?? -1,
        us_identificacion: solicitud.usuarios.us_identificacion,
        us_telefono: solicitud.usuarios.us_telefono,
        us_correo: solicitud.usuarios.us_correo,
        us_tu_id: solicitud.usuarios.us_tu_id
      }
    };
  }
}
