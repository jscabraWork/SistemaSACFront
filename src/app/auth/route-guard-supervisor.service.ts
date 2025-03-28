import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardSupervisorService {
  constructor(private autenticador: AuthService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.autenticador.getAgenteId() && this.autenticador.getLiderId()==null ){
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }
    
  }
}
