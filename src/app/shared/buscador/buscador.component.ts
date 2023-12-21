import { Component, Output } from '@angular/core';
import { BuscadorService } from './buscador.service';
import { accessTokenKey } from 'src/app/core/constants/constants';
import { AlbumInfoInterface } from '../../core/interfaces/AlbumInfoInterface';
import { DataEmitterService } from 'src/app/core/services/data-emitter.service';

@Component({
    selector: 'shared-buscador',
    templateUrl: './buscador.component.html',
    styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
    @Output()
    public albumsInfoList: AlbumInfoInterface[] = [];
    
    public searchText: string = "";
    public next20AlbumsUrl: string = "";
    public token: string;

    private buscadorService: BuscadorService;
    private dataEmitterService: DataEmitterService;



    constructor(buscadorService: BuscadorService, dataEmitterService: DataEmitterService) { 
        this.buscadorService = buscadorService;
        this.dataEmitterService = dataEmitterService;

        this.token = localStorage.getItem(accessTokenKey)!;
    }

    /**
     * API GET Request para obtener datos sobre los albumes que busque el usuario.
     * * Invocado desde buscador.component.html
     */
    public searchContent(): void {
        let searchText = this.searchText;

        this.buscadorService.searchContent(searchText, this.token)
        .subscribe(
            async (response) => {
                try {
                    console.log('Respuesta de la búsqueda:', response);
                    this.next20AlbumsUrl = response.albums.next;
                    await this.formatAlbumsList(response.albums.items);
                } 
                catch (error) {
                    // Puedes manejar el error aquí según tus necesidades
                    console.error('Error en la búsqueda:', error);
                }
            }
        )
        // fin metodo
    }

    /**
     * Formateo los albumes obtenidos de la API de spotify.
     * * Invocado por searchContent()
     */
    private formatAlbumsList(albums: any) {
        let albumInfoList: AlbumInfoInterface[] = [];
        
        /**
         * Recorro los albumes obtenidos y creo una
         * lista de albums con los datos de la interfaz AlbumInfoInterface
         */
        for (let index = 0; index < albums.length; index++) {
            const album: any = albums[index];
            
            let albumInfoObj: AlbumInfoInterface = {
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
            albumInfoList[index] = albumInfoObj;
        }

        this.albumsInfoList = albumInfoList;
        this.emitAlbumList(albumInfoList)
    }

    /**
     * 
     */
    private emitAlbumList(albumInfoList: AlbumInfoInterface[]){
        console.log("emitAlbumList()", albumInfoList);
        
        this.dataEmitterService.emitAlbumInterface(albumInfoList)
    }
    

    // fin clase
}
