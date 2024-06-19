import { Injectable, OnInit } from '@angular/core';
import { SpotifyMe, accessTokenKey } from '../../core/constants/constants';
import { MyUserInfoInterface } from 'src/app/core/interfaces/MyUserInfoInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    public spotifyApiUrl: string = SpotifyMe;

    private accessTokenKey: string = accessTokenKey;
    private token: string;
    private httpClient: HttpClient;
    private myUserInfoObj: MyUserInfoInterface;

    constructor(httpClient: HttpClient) {
        this.token = localStorage.getItem(accessTokenKey)!;
        this.myUserInfoObj = { display_name: "", externalUrl: "", ApiEndpointUserData: "", id: "", profileImageUrl: "", followers: 0, country: "", email: "" }
        this.httpClient = httpClient;

        this.getMoreInfo(this.spotifyApiUrl, this.token);
    }

    public getMoreInfo(spotifyApiUrl: string, token: string): void {
        this.loadTokenFromLocalStorage();

        this.getMyUserProfileData(this.spotifyApiUrl, this.token)
            .then((res: any) => {
                console.log(res);
            })
    }

    public loadTokenFromLocalStorage(): string {
        let token: string = localStorage.getItem(this.accessTokenKey)!;

        if (token.length < 1) {
            console.error("HomeService.loadTokenFromLocalStorage() -> ERROR: No se ha podido obtener el token de acceso");
        }

        return token;
    }

    private async getMyUserProfileData(spotifyApiUrl: string, token: string): Promise<MyUserInfoInterface | void> {
        let userInfoObj: MyUserInfoInterface;

        // TODO: obtener info de la api con this.httpclient<

        try {
            let result = await fetch(spotifyApiUrl, { method: "GET", headers: { Authorization: `Bearer ${token}` } });

            if (!result.ok) {
                throw new Error(`Error: ${result.status} - ${result.statusText}`);
            }

            const data = await result.json();
            console.log("HomeService.getMyUserProfileData() ->", data);
            userInfoObj = data;

            return data;
        }
        catch (error) {
            console.error('Error al realizar la solicitud:', error);
            // Puedes lanzar el error nuevamente para que sea manejado por el código que llama a esta función.
            // throw error;
        }
    }
}
