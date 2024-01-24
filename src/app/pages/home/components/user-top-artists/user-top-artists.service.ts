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
    public async fetchUserTopArtistsList(apiUrl: string, token: string): Promise<ArtistCardInfoInterface[]> {
        const headers = new HttpHeaders({"Authorization": "Bearer " + token});
        let artistInfoList: ArtistCardInfoInterface[] = [];
        let artistInfoAux: ArtistCardInfoInterface;

        // Añado a la url el parámetro limit=6 para obtener como máximo 6 artistas tras hacer la petición a la api
        apiUrl = apiUrl + "?limit=6";
        
        // Peticion api para obtener informacion sobre los artistas
        this.httpClient.get(apiUrl, { headers: headers })
        .subscribe(response => {
            let data: any = response

            console.log("UserTopArtistsService.fetchUserTopArtistsList() ->", data);
            
            
            for (let index = 0; index < data.items.length; index++) {
                artistInfoAux = {
                    name: data.items[index].name,
                    img: data.items[index].images[0].url,
                    spotify_url: data.items[index].external_urls.spotify,
                    apiId: data.items[index].id,
                    css: ""
                };

                artistInfoList.push(artistInfoAux);
            }
        });

        return await artistInfoList;
    }
}
