import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app-constants';
import { Observable } from 'rxjs';
import { SolicitudCreacion } from '../models/creaciones.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http: HttpClient) { }


  crearSolicitud(solicitud: SolicitudCreacion, files?: FileList): Observable<any> {

    let formData = new FormData();

    // Eliminar atributos undefined
    let solicitudLimpia = JSON.parse(JSON.stringify(solicitud));
    console.log(solicitudLimpia)
    formData.append('solicitudReqText', JSON.stringify(solicitudLimpia));
    // formData.append('file',files[0]);
    if (files) {
      formData.append('file', files[0]);
    }

    return this.http.post<any>(API_URL, formData)
  }


  getSolicitudPorRadicado(solicitudNumber): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('number', solicitudNumber.toString());

    return this.http.get<any>(`${API_URL}/SolicitudNumber`, { headers, params });
  }


  getSolicitudesPorEmail(email): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams().set('email', email.toString());

    return this.http.get<any>(`${API_URL}/SolicitudEmail`, { headers, params });
  }


  getSolicitudesPorColaborador(idColaborador, idEstado) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams();
    const request =this.http.get<any>(`${API_URL}/SolicitudGetColaborator?so_col_id=${idColaborador}&so_es_id=${idEstado}`, { headers, params });
    console.log(request)
    return  request;
  }

}


