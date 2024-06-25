import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// auth guard service
import { HomePageAuthService } from '../core/auth-guards/home-page-auth.service';

import { HomeComponent } from './home/home.component';
import { MyArtistsComponent } from './my-artists/my-artists.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


const routes: Routes = [
    // * Este routerMdoule está dentro de la dirección /me
    // todo: implmementar otros authGuards para las otras rutas (canActivate: [XXXXAuthService])
    // { path: 'home', component: HomeComponent, canActivate: [HomePageAuthService] },
    { path: 'home', component: HomeComponent },
    { path: 'my-artists', component: MyArtistsComponent },
    { path: 'my-playlists', component: MyPlaylistsComponent },
    { path: 'my-profile', component: MyProfileComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
