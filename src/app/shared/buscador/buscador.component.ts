import { Component } from '@angular/core';


import { BuscadorService } from './buscador.service';
import { DataEmitterService } from 'src/app/core/global-services/data-emitter.service';

import { accessTokenKey, lastSearchedKey } from 'src/app/core/constants/constants';
import { PlaylistDataInterface } from 'src/app/core/interfaces/PlaylistDataInterface';


@Component({
    selector: 'shared-buscador',
    templateUrl: './buscador.component.html',
    styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
    public albumsInfoList: PlaylistDataInterface[] = [];
    // * Obtener el texto que hay en el input mediante ngModel y FormsModule desde shared-module
    public searchText: string = "";
    public next20AlbumsUrl: string = "";
    public token: string = "";

    private buscadorService: BuscadorService;
    private dataEmitterService: DataEmitterService;

    constructor(buscadorService: BuscadorService, dataEmitterService: DataEmitterService) {
        this.buscadorService = buscadorService;
        this.dataEmitterService = dataEmitterService;

        this.token = localStorage.getItem(accessTokenKey)!;
    }

    /**
     * Invocado desde buscador.component.html
     * 
     * API GET Request para obtener una lista de albums que busque el usuario.
     * Formatea la lista a una lista de objetos conocidos.
     * Emite la lista.
     * 
     */
    public searchContent(): void {
        if (this.searchText.length == 0) return

        let searchText = this.searchText;

        localStorage.setItem(lastSearchedKey, searchText);

        this.buscadorService.searchContent(searchText, this.token)
            .subscribe(
                async (response) => {
                    try {
                        console.log('Respuesta de la búsqueda:', response);
                        this.next20AlbumsUrl = response.albums.next;
                        this.albumsInfoList = await this.formatAlbumsList(response.albums.items);
                    }
                    catch (error) {
                        // Puedes manejar el error aquí según tus necesidades
                        console.error('Error en la búsqueda:', error);
                    }
                }
            );
    }

    // todo
    public getItemInfoPage(index: number){
        console.log(this.albumsInfoList[index]);
    }

    /**
     * Formateo los albumes obtenidos de la API de spotify.
     * Invocado por searchContent()
     */
    private async formatAlbumsList(albums: any) {
        let albumInfoList: PlaylistDataInterface[] = [];

        /**
         * Recorro los albumes obtenidos y creo una
         * lista de albums con los datos de la interfaz PlaylistDataInterface
         */
        for (let index = 0; index < albums.length; index++) {
            const album: any = albums[index];

            let albumInfoObj: PlaylistDataInterface = this.makePlaylistDataInterfaceObject(album);
            albumInfoList[index] = albumInfoObj;
        }

        this.emitAlbumList(albumInfoList);
        return albumInfoList;
    }

    private makePlaylistDataInterfaceObject(album: any): PlaylistDataInterface {
        let albumInfoObj: PlaylistDataInterface = {
            album_type: album.album_type,
            api_href: album.href,
            api_id: album.id,
            artist: album.artists[0].name,
            img_url: album.images[0].url,
            name: album.name,
            release_date: album.release_date,
            spotify_url: album.external_urls.spotify,
            total_tracks: album.total_tracks,
        }

        return albumInfoObj;
    }

    private emitAlbumList(albumInfoList: PlaylistDataInterface[]) {
        console.log("emitAlbumList()", albumInfoList);

        this.dataEmitterService.emitAlbumInterface(albumInfoList)
    }
}
