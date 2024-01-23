import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';

import { ArtistListComponent } from './components/user-top-artists/components/artist-list/artist-list.component';
import { AlbumCardComponent } from './components/user-top-albums/components/album-card/album-card.component';
import { HomeComponent } from './home.component';
import { UserTopAlbumsComponent } from './components/user-top-albums/user-top-albums.component';
import { UserTopArtistsComponent } from './components/user-top-artists/user-top-artists.component';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
    ],
    exports: [],
    declarations: [
        AlbumCardComponent,
        ArtistListComponent,
        UserTopArtistsComponent,
        HomeComponent,
        UserTopAlbumsComponent,
        UserTopArtistsComponent,
    ],
    providers: [],
})
export class HomeModule { }
