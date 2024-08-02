import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// *obtener datos de formularios con ngModel
import { FormsModule } from '@angular/forms';

// modulo angular material
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

// modulo httpclient para hacer peticiones http
import { HttpClientModule } from '@angular/common/http';

// componentes
import { AudioReproducerBarComponent } from './audio-reproducer-bar/audio-reproducer-bar.component';

import { BuscadorComponent } from './buscador/buscador.component';

import { CardAlbumComponent } from './card-album/card-album.component';
import { CardArtistComponent } from './card-artist/card-artist.component';
import { CardPlaylistComponent } from './card-playlist/card-playlist.component';
import { CardTrackComponent } from './card-track/card-track.component';

import { DialogErrorComponent } from './dialog-error/dialog-error.component';

import { ExternalLinkIconComponent } from './external-link-icon/external-link-icon.component';

import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { FooterComponent } from './footer/footer.component';

import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        AudioReproducerBarComponent,

        BuscadorComponent,

        CardAlbumComponent,
        CardArtistComponent,
        CardPlaylistComponent,
        CardTrackComponent,

        DialogErrorComponent,

        ExternalLinkIconComponent,

        FilterBarComponent,
        FooterComponent,

        HeaderComponent,
    ],
    exports: [
        AudioReproducerBarComponent,

        BuscadorComponent,

        CardAlbumComponent,
        CardArtistComponent,
        CardPlaylistComponent,
        CardTrackComponent,

        DialogErrorComponent,

        ExternalLinkIconComponent,

        FilterBarComponent,
        FooterComponent,

        HeaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatDialogModule,
        HttpClientModule,
    ]
})
export class SharedModule { }
