import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchItemsComponent } from './search-items.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ContenedorCancionesComponent } from './components/contenedor-canciones/contenedor-canciones.component';
import { ContenedorPlaylistsAlbumsComponent } from './components/contenedor-playlists-albums/contenedor-playlists-albums.component';
import { ContenedorArtistasComponent } from './components/contenedor-artistas/contenedor-artistas.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        MatTabsModule,
    ],
    declarations: [
        ContenedorCancionesComponent,
        ContenedorArtistasComponent,
        ContenedorPlaylistsAlbumsComponent,
        SearchItemsComponent,
    ]
})
export class SearchItemsModule { }
