import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'my-playlists', component: MyPlaylistsComponent },
    { path: 'my-profile', component: MyProfileComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
