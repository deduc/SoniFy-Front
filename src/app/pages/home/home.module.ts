import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './home.component';
import { UserTopArtistsComponent } from './components/user-top-artists/user-top-artists.component';

import { AudioReproducerBarComponent } from 'src/app/shared/audio-reproducer-bar/audio-reproducer-bar.component';
import { UserPlaylistsComponent } from './components/user-playlists/user-playlists.component';
import { PlaylistsCardComponent } from './components/user-playlists/components/album-card/playlists-card.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        AudioReproducerBarComponent,
        HomeComponent,
        UserTopArtistsComponent,
        UserPlaylistsComponent,
        PlaylistsCardComponent,
        
    ],
    providers: [],
})
export class HomeModule { }
