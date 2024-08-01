import { Component, Input, } from '@angular/core';
import { AlbumDataInterface } from 'src/app/core/interfaces/AlbumDataInterface';
import { PlaylistDataInterface } from 'src/app/core/interfaces/PlaylistsDataInterface';

@Component({
    selector: 'search-items-contenedor-playlists-albums',
    templateUrl: './contenedor-playlists-albums.component.html',
    styleUrls: ['./contenedor-playlists-albums.component.css']
})
export class ContenedorPlaylistsAlbumsComponent {
    @Input()
    public albums: AlbumDataInterface[] = [];
    @Input()
    public playlists: PlaylistDataInterface[] = [];

    constructor() { }
}
