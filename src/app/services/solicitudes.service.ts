import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud.model';
import { API_URL } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http:HttpClient) { }


  crearSolicitud(solicitud:Solicitud){
    return this.http.post<any>(`${API_URL}/crear`,solicitud);
  }

}
