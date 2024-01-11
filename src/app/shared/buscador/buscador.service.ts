import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpotifySearch } from 'src/app/core/constants/constants';


@Injectable({
    providedIn: 'root'
})
export class BuscadorService {
    private apiUrl = 'https://api.spotify.com/v1';

    constructor(private http: HttpClient) { }

    /**
     * Invocado por BuscadorComponent.searchContent().
     * Hago una petición a la api de spotify.
     */
    public searchContent(query: string, token: string): Observable<any> {
        const searchQuery = query;
        const url = `${SpotifySearch}?q=${searchQuery}&type=album`;

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        return this.http.get(url, { headers });
    }
}
