import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ArtistCardInfoInterface } from './Interfaces/ArtistCardInfoInterface';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserTopArtistsService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    /**
     * Hago petición a la api para obtener información sobre los top artistas de spotify del usuario.
     */
    public fetchUserTopArtistsList(apiUrl: string, token: string): Observable<any> {
        const headers = new HttpHeaders({ "Authorization": "Bearer " + token });
        let artistInfoList: ArtistCardInfoInterface[] = [];
        let artistInfoAux: ArtistCardInfoInterface;

        // Añado a la url el parámetro limit=6 para obtener como máximo 6 artistas tras hacer la petición a la api
        // apiUrl = apiUrl + `?limit=6`;

        // Peticion api para obtener informacion sobre los artistas
        return this.httpClient.get(apiUrl, { headers: headers });
    }
}
