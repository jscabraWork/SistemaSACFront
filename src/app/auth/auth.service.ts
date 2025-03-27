import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Agente } from '../models/login.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }


  guardarAgente(agente:Agente){

    sessionStorage.setItem('agenteID',agente.col_id.toString());
    if(agente.col_col_id_lider){
      sessionStorage.setItem('liderId',agente.col_col_id_lider.toString());
    }
    this.router.navigate(['responder'])

  }

  getAgenteId(){
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem('agenteID');
    }
    return null;

  }
  getLiderId(){
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem('liderId');
    }
    return null;
  }
}
