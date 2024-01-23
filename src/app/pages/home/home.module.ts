import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './home.component';
import { UserTopAlbumsComponent } from './components/user-top-albums/user-top-albums.component';
import { UserTopArtistsComponent } from './components/user-top-artists/user-top-artists.component';
import { ArtistListComponent } from './components/user-top-artists/components/artist-list/artist-list.component';


@NgModule({
    imports: [
        SharedModule,
        CommonModule,
    ],
    exports: [],
    declarations: [
        ArtistListComponent,
        UserTopArtistsComponent,
        HomeComponent,
        UserTopAlbumsComponent,
        UserTopArtistsComponent,
    ],
    providers: [],
})
export class HomeModule { }
