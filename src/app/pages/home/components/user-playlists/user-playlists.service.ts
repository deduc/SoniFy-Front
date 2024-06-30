import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserPlaylistsService {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    public getUserPlaylists(userPlaylistsEndpoint: string, accessToken: string): Observable<any> {
        const headers = { "Authorization": "Bearer " + accessToken };

        return this.httpClient.get<any>(userPlaylistsEndpoint, { headers: headers });
    }

    public getUserLikedSongs(userLikedSongsEndpoint: string, accessToken: string): Observable<any> {
        const headers = { "Authorization": "Bearer " + accessToken };

        return this.httpClient.get<any>(userLikedSongsEndpoint, { headers: headers });
    }

}
