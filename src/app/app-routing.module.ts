import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'me',
        /*
            Lazy loading. Se carga cuando es necesario acceder a esta ruta.
            importa pages module y cuando termina de cargar, lo usa.
            Más concretamente usa pages routing module.

            * En caso de no funcionar, usa esto:
            loadChildren: () => import("./pages/pages-routing.module").then(m => m.PagesRoutingModule) 
         */
        loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
