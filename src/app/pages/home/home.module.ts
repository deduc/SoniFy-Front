import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';

import { ArtistListComponent } from './components/user-top-artists/components/artist-list/artist-list.component';
import { AlbumCardComponent } from './components/user-top-albums/components/album-card/album-card.component';
import { HomeComponent } from './home.component';
import { UserTopAlbumsComponent } from './components/user-top-albums/user-top-albums.component';
import { UserTopArtistsComponent } from './components/user-top-artists/user-top-artists.component';

// modulo angular material
import { MatIconModule } from '@angular/material/icon';
import { AudioReproducerBarComponent } from 'src/app/shared/audio-reproducer-bar/audio-reproducer-bar.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        AlbumCardComponent,
        ArtistListComponent,
        AudioReproducerBarComponent,
        HomeComponent,
        UserTopAlbumsComponent,
        UserTopArtistsComponent,

    ],
    providers: [],
})
export class HomeModule { }
