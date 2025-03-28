import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConsultaReporte } from '../models/reporte.model';
import { API_URL_COLABORADOR } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http:HttpClient) { }

  getConsultaReporte(consultaSuci:ConsultaReporte){

        // Eliminar atributos undefined
        let consulta = JSON.parse(JSON.stringify(consultaSuci));
      console.log(consulta)
    return this.http.post<any>(`${API_URL_COLABORADOR}/ConsultaDesempeno`, consulta)
  }
}
