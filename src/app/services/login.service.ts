import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agente, Usuario } from '../models/login.models';
import { API_URL_LOGIN } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(private http:HttpClient) { }

    login(usuario:Usuario){

      return this.http.post<Agente>(`${API_URL_LOGIN}/login`,usuario);
    }

}
