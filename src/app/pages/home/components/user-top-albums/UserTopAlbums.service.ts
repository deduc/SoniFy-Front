import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    public fetchUserTopAlbumsList(spotifyTopAlbumsEndpoint: string, accessToken: string) {
        const headers = new HttpHeaders({"Authorization": "Bearer " + accessToken});
        
        this.httpClient.get("https://api.spotify.com/v1/me/albums", { headers: headers})
        .subscribe(response => {
            console.log("aaa", response);
        })

    }
}
