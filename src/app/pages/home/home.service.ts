import { Injectable } from '@angular/core';

import { SpotifyMe, accessTokenKey } from '../../core/constants/constants';
import { MyUserInfoInterface } from 'src/app/core/interfaces/MyUserInfoInterface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HomeService {
    public spotifyApiUrl: string = SpotifyMe;

    private userInfoSubject = new BehaviorSubject<MyUserInfoInterface | null>(null);
    public userInfo$ = this.userInfoSubject.asObservable();

    public httpHeaders: any;

    private accessTokenKey: string = accessTokenKey;
    private token: string;
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.token = localStorage.getItem(accessTokenKey)!;

        // Inicializar myUserInfoSubject
        let myUserInfo = { displayName: "", externalUrl: "", ApiEndpointUserData: "", Userid: "", profileImageUrl: "", followers: 0, country: "", email: "" };
        this.userInfoSubject.next(myUserInfo);

        this.httpClient = httpClient;
        this.httpHeaders = { method: "GET", headers: { Authorization: `Bearer ${this.token}` } };

        this.loadTokenFromLocalStorage();
        this.loadUserDataFromAPI(this.spotifyApiUrl, this.httpHeaders);
    }

    public loadUserDataFromAPI(spotifyApiUrl: string, httpHeaders: any): void {
        this.httpClient.get(spotifyApiUrl, httpHeaders)
            .subscribe((response: any) => {
                // console.log("HomeService.loadUserDataFromAPI() -> Obtener información del usuario", response);

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

    public loadTokenFromLocalStorage(): string {
        let token: string;

        try {
            token = localStorage.getItem(this.accessTokenKey)!;

            if (token.length < 1) {
                // console.error("HomeService.loadTokenFromLocalStorage() -> ERROR: No se ha podido obtener el token de acceso");
                token = "null_string";
            } else { 
                // console.log("HomeService.loadTokenFromLocalStorage() -> Se ha cargado el token de acceso."); 
            }
        }
        catch (error) { token = "null_string"; }

        return token;
    }

    public getMyUserProfileDataFromAPI(spotifyApiUrl: string, httpHeaders: any): Observable<any> {
        return this.httpClient.get<any>(spotifyApiUrl, httpHeaders);
    }
}
