import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { MyUserInfoInterface } from '../interfaces/MyUserInfoInterface';
import { SpotifyMe, accessTokenKey } from '../constants/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    public httpHeaders: any;

    // Datos personales del usuario
    public userInfoSubject = new BehaviorSubject<MyUserInfoInterface | null>(null);
    public userInfo$ = this.userInfoSubject.asObservable();

    private accessToken: string = "";
    private accessTokenKey: string = accessTokenKey;
    private httpClient: HttpClient;
    private spotifyApiUrl: string = SpotifyMe;


    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;

        this.loadTokenFromLocalStorage();
        this.httpHeaders = { method: "GET", headers: { Authorization: `Bearer ${this.accessToken}` } };

        // Inicializar myUserInfoSubject
        let myUserInfo = { displayName: "", externalUrl: "", ApiEndpointUserData: "", Userid: "", profileImageUrl: "", followers: 0, country: "", email: "" };
        this.userInfoSubject.next(myUserInfo);

        this.loadUserDataFromAPI(this.spotifyApiUrl, this.httpHeaders);
    }

    public getArtists() { }

    public getAlbums() { }

    public getPlaylists() { }

    public getUserData() { }

    public getUserProfileImage() { }

    public loadAccessTokenFromLocalStorage() { }

    private loadUserDataFromAPI(spotifyApiUrl: string, httpHeaders: any): void {
        console.log("HomeService.loadUserDataFromAPI() -> Obtengo el token de localstorage y los datos del perfil del usuario");

        this.httpClient.get(spotifyApiUrl, httpHeaders)
            .subscribe((response: any) => {
                console.log("HomeService.loadUserDataFromAPI() -> Obtener información del usuario", response);

                let userInfoObj: MyUserInfoInterface = {
                    displayName: response.display_name,
                    externalUrl: response.external_urls.spotify,
                    ApiEndpointUserData: response.href,
                    Userid: response.id,
                    profileImageUrl: response.images[1].url,
                    followers: response.followers.total,
                    country: response.country,
                    email: response.email
                };

                this.userInfoSubject.next(userInfoObj);
            });
    }

    private loadTokenFromLocalStorage(): string {
        let token: string;

        try {
            token = localStorage.getItem(this.accessTokenKey)!;

            if (token.length < 1) {
                console.error("HomeService.loadTokenFromLocalStorage() -> ERROR: No se ha podido obtener el token de acceso");
                token = "null_string";
            } else { console.log("HomeService.loadTokenFromLocalStorage() -> Hay token de acceso."); }
        }
        catch (error) { token = "null_string"; }

        return token;
    }
}
