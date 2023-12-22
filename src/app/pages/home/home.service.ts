import { Injectable } from '@angular/core';

import { ApiGetClientIdAndSecret, SpotifyTokenUrl, codeFromUrlKey, redirectUriKey } from 'src/app/core/constants/constants';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    private clientId: string = "null_clientId";
    private clientSecret: string = "null_clientSecret";
    private codeFromUrl: string = "null_codeFromUrl";
    private redirectUri: string = "null_redirectUri";
    private spotifyTokenUrl: string = "null_spotifyTokenUrl";

    private tokenService: TokenService

    constructor(tokenS: TokenService) {
        this.tokenService = tokenS;

        this.setClientIdAndSecret(ApiGetClientIdAndSecret);
        this.codeFromUrl = this.setcodeFromUrl();
        this.redirectUri = this.setRedirectUri();
        this.spotifyTokenUrl = SpotifyTokenUrl;
    }

    public getAccessToken(){
        setTimeout(() => {
            console.log(this.clientId);
            console.log(this.clientSecret);
            console.log(this.codeFromUrl);
            console.log(this.redirectUri);
            console.log(this.spotifyTokenUrl);
            
            this.tokenService.checkAccessToken(this.clientId, this.clientSecret, this.codeFromUrl, this.redirectUri, this.spotifyTokenUrl);
        }, 100);
    }

    private setClientIdAndSecret(endpoint: string): void {
        try {
            fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                this.clientId = data.client_id;
                this.clientSecret = data.client_secret;
            })
        } catch (error) {
            console.log(error);
            alert("No se ha podido contactar con la API.")
                        
        }
    }

    private setcodeFromUrl(): string {
        const queryString = window.location.search;
        const codeFromUrl: string = new URLSearchParams(queryString).get(codeFromUrlKey)!.toString();
      
        return codeFromUrl;
    }

    private setRedirectUri(): string {
        const redirectUri = localStorage.getItem(redirectUriKey)!;

        return redirectUri;
    }
}
