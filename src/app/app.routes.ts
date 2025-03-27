import { Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { ConsultarSolicitudComponent } from './consultar-solicitud/consultar-solicitud.component';
import { ResponderSolicitudComponent } from './responder-solicitud/responder-solicitud.component';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './auth/route-guard.service';

export const routes: Routes = [
    {
        path:'home',
        component:FormularioComponent
    },
    {
        path:'consultar',
        component:ConsultarSolicitudComponent
    },
    {
        path:'responder',
        component:ResponderSolicitudComponent,
        canActivate:[RouteGuardService]
        
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'**',
        component:FormularioComponent
    }
];
