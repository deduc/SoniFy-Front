import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';

import { AuthService } from '../core/auth.service';


const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthService] },
    { path: 'my-playlists', component: MyPlaylistsComponent, canActivate: [AuthService] },
    { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthService] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
