import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
// auth guard service
import { HomePageAuthService } from '../core/auth-guards/home-page-auth.service';


const routes: Routes = [
    // Este routerMdoule está dentro de la dirección /me
    { path: 'home', component: HomeComponent, canActivate: [HomePageAuthService] },
    
    // todo: implmementar otros authGuards para las otras rutas (canActivate: [XXXXAuthService])
    
    { path: 'my-playlists', component: MyPlaylistsComponent },
    { path: 'my-profile', component: MyProfileComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
