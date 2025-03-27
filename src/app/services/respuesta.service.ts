import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Respuesta } from '../models/solicitud.model';
import { Observable } from 'rxjs';
import { API_URL } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  constructor(private http:HttpClient) { }


    responderSolicitud(respuesta): Observable<any> {
      return this.http.post<any>(`${API_URL}/EditarSolicitud`, respuesta)
    }


}
