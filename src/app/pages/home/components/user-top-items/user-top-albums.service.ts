import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ArtistInterface } from 'src/app/core/interfaces/ArtistsInterface';
import { TopArtistListInterface } from 'src/app/core/interfaces/TopArtistListInterface';

import { DataEmitterService } from 'src/app/core/services/data-emitter.service';


@Injectable({
    providedIn: 'root'
})
export class UserTopAlbumsService {
    private dataEmitterService: DataEmitterService;
    private httpClient: HttpClient;

    constructor(dataEmitterService: DataEmitterService, httpClient: HttpClient) {
        this.dataEmitterService = dataEmitterService;
        this.httpClient = httpClient
    }

    /**
     * Hago petición a la api para obtener información sobre los top artistas de spotify del usuario.
     */
    public async fetchUserTopArtistsList(apiUrl: string, token: string): Promise<any> {
        const headers = new HttpHeaders({"Authorization": "Bearer " + token});
        let topArtistsListObj: TopArtistListInterface = {href: "", limit: 0, next: "", total: 0, items: []};

        // Añado a la url el parámetro limit = 20 para obtener como máximo 20 artistas tras hacer la petición a la api
        apiUrl = apiUrl + "?limit=20";
        
        // Peticion api
        this.httpClient.get(apiUrl, { headers: headers })
        .subscribe(response => {
            let data: any = response;
            
            topArtistsListObj = this.formatTopArtistsListObj(data);
            
            console.log("UserTopAlbumsComponent.fetchUserTopArtistsList() ->", topArtistsListObj);
            
            this.dataEmitterService.emitTopArtistListInterface(topArtistsListObj);
        });
    }

    /**
     * Creo y devuelvo un objeto TopArtistListInterface con la propiedad items = ArtistInterface[].
     */
    private formatTopArtistsListObj(data: any): TopArtistListInterface {
        let topArtistsListObj: TopArtistListInterface = {href: "", limit: 0, next: "", total: 0, items: []};
        let infoArtistAux: ArtistInterface;

        topArtistsListObj.href = data.href;
        topArtistsListObj.limit = data.limit;
        topArtistsListObj.next = data.next;
        topArtistsListObj.total = data.total;
        
        // Recorro la lista data.items para añadir objetos ArtistInterface a la lista topArtistsListObj.items
        for (let index = 0; index < data.items.length; index++) {
            let currentArtist: any = data.items[index];
            
            // Reinicio el objeto infoArtistAux
            infoArtistAux = {external_url: "", genres: [""], id: "", image_url: "", name: ""};

            // Añado valores a infoArtistAux
            infoArtistAux.external_url = currentArtist.external_urls.spotify;
            infoArtistAux.genres = currentArtist.genres;
            infoArtistAux.id = currentArtist.id;
            infoArtistAux.image_url = currentArtist.images[0];
            infoArtistAux.name = currentArtist.name;

            topArtistsListObj.items.push(infoArtistAux);
        }

        return topArtistsListObj;
    }
}
