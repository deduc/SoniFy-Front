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

    public componentIndexToRender: number = 0;

    private cssClassButtonPressed: string = "button-pressed";
    private cssClassButtonNonPressed: string = "button-non-pressed";

    public cssClassBtn0: string = this.cssClassButtonPressed;
    public cssClassBtn1: string = this.cssClassButtonNonPressed;




    constructor() { }


    public changeComponentToRender(index: number): void {
        this.componentIndexToRender = index;

        if (index == 0) {
            this.cssClassBtn0 = this.cssClassButtonPressed;
            this.cssClassBtn1 = this.cssClassButtonNonPressed;
        }
        else if (index == 1) {
            this.cssClassBtn1 = this.cssClassButtonPressed;
            this.cssClassBtn0 = this.cssClassButtonNonPressed;
        }
    }
}
