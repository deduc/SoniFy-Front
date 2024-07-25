import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifySearch } from 'src/app/core/constants/constants';


@Injectable({
    providedIn: 'root'
})
export class BuscadorService {
    private spotifySearch: string = SpotifySearch;

    constructor(private http: HttpClient) { }

    /**
     * Invocado por BuscadorComponent.searchContent().
     * Hago una petición a la api de spotify preguntando por el valor de searchQuery
     */
    public searchContent(searchQuery: string, token: string): Observable<any> {
        const url = `${this.spotifySearch}?q=${searchQuery}&type=album`;

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        return this.http.get(url, { headers });
    }
}
