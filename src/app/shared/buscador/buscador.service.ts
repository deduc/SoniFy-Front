import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class BuscadorService {
    private apiUrl = 'https://api.spotify.com/v1';

    constructor(private http: HttpClient) { }

    public searchContent(query: string, token: string): Observable<any> {
        const searchQuery = query;
        const url = `${this.apiUrl}/search?q=${searchQuery}&type=album`;

        // Reemplaza 'Bearer <TOKEN>' con tu token de autorización de Spotify
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });

        return this.http.get(url, { headers });
    }
}
