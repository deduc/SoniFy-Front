import { Component, OnInit } from '@angular/core';
import { BuscadorService } from './buscador.service';
import { accessTokenKey } from 'src/app/core/constants/constants';
import { AlbumInfoInterface } from './interfaces/AlbumInfoInterface';

@Component({
    selector: 'shared-buscador',
    templateUrl: './buscador.component.html',
    styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
    public searchText: string = "";
    public next20AlbumsUrl: string = "";
    public token: string;

    constructor(private buscadorService: BuscadorService) { 
        this.token = localStorage.getItem(accessTokenKey)!;
    }

    ngOnInit() { }

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

    private formatAlbumsList(albums: any) {
        let albumInfoList: AlbumInfoInterface[] = [];
        
        /**
         * Recorro los albumes obtenidos por consola para crear
         * una lista de albums con los datos que yo quiero
         */
        for (let index = 0; index < albums.length; index++) {
            const album: any = albums[index];
            
            let albumInfoObj: AlbumInfoInterface = {
                album_type: album.album_type,
                api_href: album.href,
                api_id: album.id,
                img_url: album.images[0].url,
                name: album.name,
                release_date: album.release_date,
                spotify_url: album.external_urls.spotify,
                total_tracks: album.total_tracks,
            }
            
            albumInfoList[index] = albumInfoObj;
        }

        console.log(albumInfoList);
    }

    // fin clase
}
