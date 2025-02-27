import { Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { ConsultarSolicitudComponent } from './consultar-solicitud/consultar-solicitud.component';

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
        path:'**',
        component:FormularioComponent
    }
];
