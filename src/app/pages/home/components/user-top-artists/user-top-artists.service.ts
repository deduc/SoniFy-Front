import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ArtistInterface } from 'src/app/core/interfaces/ArtistsInterface';
import { TopArtistListInterface } from 'src/app/core/interfaces/TopArtistListInterface';

import { DataEmitterService } from 'src/app/core/services/data-emitter.service';
import { ArtistCardInfoInterface } from './Interfaces/ArtistCardInfoInterface';


@Injectable({
    providedIn: 'root'
})
export class UserTopArtistsService {
    private dataEmitterService: DataEmitterService;
    private httpClient: HttpClient;

    constructor(dataEmitterService: DataEmitterService, httpClient: HttpClient) {
        this.dataEmitterService = dataEmitterService;
        this.httpClient = httpClient
    }

    /**
     * Hago petición a la api para obtener información sobre los top artistas de spotify del usuario.
     */
    public async fetchUserTopArtistsList2(apiUrl: string, token: string): Promise<void> {
        const headers = new HttpHeaders({"Authorization": "Bearer " + token});
        let topArtistsListObj: TopArtistListInterface = {href: "", limit: 0, next: "", total: 0, items: []};

        // Añado a la url el parámetro limit=6 para obtener como máximo 6 artistas tras hacer la petición a la api
        apiUrl = apiUrl + "?limit=6";
        
        // Peticion api
        await this.httpClient.get(apiUrl, { headers: headers })
        .subscribe(response => {
            let data: any = response;
            
            topArtistsListObj = this.formatTopArtistsListObj(data);
            console.log("UserTopArtistsService.fetchUserTopArtistsList() ->", topArtistsListObj);
            
            this.dataEmitterService.emitTopArtistListInterface(topArtistsListObj);
        });
    }

    /**
     * Hago petición a la api para obtener información sobre los top artistas de spotify del usuario.
     */
    public async fetchUserTopArtistsList(apiUrl: string, token: string): Promise<ArtistCardInfoInterface[]> {
        const headers = new HttpHeaders({"Authorization": "Bearer " + token});
        let artistInfoList: ArtistCardInfoInterface[] = [];
        let artistInfoAux: ArtistCardInfoInterface;

        // Añado a la url el parámetro limit=6 para obtener como máximo 6 artistas tras hacer la petición a la api
        apiUrl = apiUrl + "?limit=6";
        
        // Peticion api
        await this.httpClient.get(apiUrl, { headers: headers })
        .subscribe(response => {
            let data: any = response
            
            for (let index = 0; index < data.items.length; index++) {
                artistInfoAux = {
                    name: data.items[index].name,
                    img: data.items[index].images[0].url,
                    spotify_url: data.items[index].external_urls.spotify,
                    css: ""
                };

                artistInfoList.push(artistInfoAux);
            }
        });

        return await artistInfoList;
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
