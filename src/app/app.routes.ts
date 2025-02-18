import { Routes } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';

export const routes: Routes = [
    {
        path:'home',
        component:FormularioComponent
    },
    {
        path:'**',
        component:FormularioComponent
    }
];
