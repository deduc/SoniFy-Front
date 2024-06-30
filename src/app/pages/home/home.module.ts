import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './home.component';
import { UserTopArtistsComponent } from './components/user-top-artists/user-top-artists.component';

import { AudioReproducerBarComponent } from 'src/app/shared/audio-reproducer-bar/audio-reproducer-bar.component';
import { UserPlaylistsComponent } from './components/user-playlists/user-playlists.component';
import { UserAlbumsComponent } from './components/user-albums/user-albums.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        AudioReproducerBarComponent,
        HomeComponent,
        UserAlbumsComponent,
        UserTopArtistsComponent,
        UserPlaylistsComponent,
    ],
    providers: [],
})
export class HomeModule { }
