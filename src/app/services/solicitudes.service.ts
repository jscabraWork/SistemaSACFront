import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud.model';
import { API_URL } from '../app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private http:HttpClient) { }


  crearSolicitud(solicitud: Solicitud): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(API_URL, solicitud, { headers, observe: 'response' })
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
}
