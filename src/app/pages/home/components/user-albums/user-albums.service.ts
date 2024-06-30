import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpotifyUserAlbums, accessTokenKey } from 'src/app/core/constants/constants';
import { AlbumCardsInterface } from './components/album-card/interfaces/AlbumCardsInterface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserAlbumsService {
    public albumCardsList: BehaviorSubject<AlbumCardsInterface[]> = new BehaviorSubject<AlbumCardsInterface[]>([]);
    public albumCardsList$: Observable<AlbumCardsInterface[]> = this.albumCardsList.asObservable();

    private accessToken: string = "";
    private accessTokenKey: string = accessTokenKey;
    private spotifyUserAlbumsEndpoint: string = SpotifyUserAlbums;

    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
        this.accessToken = localStorage.getItem(this.accessTokenKey)!;

        this.getTopAlbumsFromApi(this.spotifyUserAlbumsEndpoint, this.accessToken);
    }

    public getTopAlbumsFromApi(userAlbumsEndpoint: string, accessToken: string): void {
        let httpHeaders: any = { method: "GET", headers: { Authorization: `Bearer ${accessToken}` } };

        this.httpClient.get(userAlbumsEndpoint, httpHeaders)
            .subscribe((res: any) => {
                this.doBuildAlbumCards(res);
            })
    }

    private doBuildAlbumCards(apiResponse: any): void {
        let albumCardsList: AlbumCardsInterface[] = []
        
        apiResponse.items.forEach((element: any) => {
            let albumCardAux: AlbumCardsInterface = {
                img: element.album.images[0].url,
                titulo: element.album.name,
                grupo: element.album.artists[0].name,
                spotifyLink: element.album.external_urls.spotify,
                css: "",
            }

            albumCardsList.push(albumCardAux);
        });

        this.albumCardsList.next(albumCardsList);
    }

}
