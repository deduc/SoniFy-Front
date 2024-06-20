import { Injectable, OnInit } from '@angular/core';

import { SpotifyMe, accessTokenKey } from '../../core/constants/constants';
import { MyUserInfoInterface } from 'src/app/core/interfaces/MyUserInfoInterface';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HomeService {
    public spotifyApiUrl: string = SpotifyMe;

    private accessTokenKey: string = accessTokenKey;
    private token: string;
    private httpClient: HttpClient;
    private myUserInfoObj: MyUserInfoInterface;
    private httpHeaders: any;

    constructor(httpClient: HttpClient) {
        this.token = localStorage.getItem(accessTokenKey)!;
        this.myUserInfoObj = { displayName: "", externalUrl: "", ApiEndpointUserData: "", Userid: "", profileImageUrl: "", followers: 0, country: "", email: "" };
        this.httpClient = httpClient;
        this.httpHeaders = { method: "GET", headers: { Authorization: `Bearer ${this.token}` } };

        this.getTokenAndUserData(this.spotifyApiUrl, this.token, this.httpHeaders);
    }

    public async getTokenAndUserData(spotifyApiUrl: string, token: string, httpHeaders: any): Promise<void> {
        console.log("HomeService.getTokenAndUserData() -> Obtengo el token de localstorage y los datos del perfil del usuario");

        this.loadTokenFromLocalStorage();

        await this.getMyUserProfileDataFromAPI(this.spotifyApiUrl, this.token, this.httpHeaders)
            .subscribe(response => {
                console.log("HomeService.getTokenAndUserData() -> ", response);

                let userInfoObj: MyUserInfoInterface = {
                    displayName: response.display_name,
                    externalUrl: response.external_urls.spotify,
                    ApiEndpointUserData: response.href,
                    Userid: response.id,
                    profileImageUrl: response.images[1]?.url || '',
                    followers: response.followers.total,
                    country: response.country,
                    email: response.email
                };

                this.myUserInfoObj = userInfoObj;
                console.log(111111, this.myUserInfoObj);
            });

        await console.log(22222, this.myUserInfoObj);

        setTimeout(() => {
            console.log(22222, this.myUserInfoObj);
        }, 1000);

    }

    public loadTokenFromLocalStorage(): string {
        let token: string;

        try {
            token = localStorage.getItem(this.accessTokenKey)!;

            if (token.length < 1) {
                console.error("HomeService.loadTokenFromLocalStorage() -> ERROR: No se ha podido obtener el token de acceso");
                token = "null_string";
            }
            else { console.log("HomeService.loadTokenFromLocalStorage() -> Hay token de acceso."); }
        }
        catch (error) { token = "null_string"; }

        return token;
    }

    private getMyUserProfileDataFromAPI2(spotifyApiUrl: string, token: string, httpHeaders: any): Observable<MyUserInfoInterface> {
        return this.httpClient.get(spotifyApiUrl, httpHeaders)
            .pipe(
                map((response: any) => {
                    console.log("HomeService.getMyUserProfileDataFromAPI() -> ", response);

                    let userInfoObj: MyUserInfoInterface = {
                        displayName: response.display_name,
                        externalUrl: response.external_urls.spotify,
                        ApiEndpointUserData: response.href,
                        Userid: response.id,
                        profileImageUrl: response.images[1]?.url || '',
                        followers: response.followers.total,
                        country: response.country,
                        email: response.email
                    };

                    return userInfoObj;
                })
            );
    }

    private getMyUserProfileDataFromAPI(spotifyApiUrl: string, token: string, httpHeaders: any): Observable<any> {
        return this.httpClient.get<any>(spotifyApiUrl, httpHeaders);
    }
}
