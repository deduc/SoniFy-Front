import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { accessTokenKey, accessTokenTimestampKey, oneHourTimeStamp } from 'src/app/core/constants/constants';


/**
 * Clase dedicada a obtener tokens de autenticación con spotify
 */
@Injectable({providedIn: 'root'})
export class TokenService {
    constructor(private http: HttpClient) {}

    /**
     * Cuando el usuario da permisos en la aplicación autenticadora OAuth2.0, 
     * obtengo el token de acceso de la api de spotify o utilizo el que ya tengo.
     */
    public async checkAccessToken(clientId: string, clientSecret: string, codeFromUrl: string, redirectUri: string, spotifyTokenUrl: string): Promise<string> {
        let accessToken: string = await this.getToken(clientId, clientSecret, codeFromUrl, redirectUri, spotifyTokenUrl);

        return accessToken
    }

    private async getToken(clientId: string, clientSecret: string, codeFromUrl: string, redirectUri: string, spotifyTokenUrl: string): Promise<string> {
        let accessToken: string = "";

        let requestOptions: any = this.makeRequestOptionsObj(clientId, clientSecret, codeFromUrl, redirectUri);
        accessToken = await this.getAndSaveToken(spotifyTokenUrl, requestOptions);

        return accessToken;
    }
    
    /**
     * Creo un objeto que contiene el header y body necesarios para hacer
     * una llamada HTTP POST al endpoint de spotify /api/token
     */
    private makeRequestOptionsObj(clientId: string, clientSecret: string, codeFromUrl: string, redirectUri: string): any {
        const base64Credentials = btoa(`${clientId}:${clientSecret}`);
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64Credentials}`,
        });
    
        const body = new URLSearchParams();
        body.set('grant_type', 'authorization_code');
        body.set('code', codeFromUrl);
        body.set('redirect_uri', redirectUri);
    
        const requestOptions = {
            headers: headers,
            body: body.toString(),
        };
    
        return requestOptions;
    }
    
    /**
     * Hago una consulta al endpoint de spotify con url https://accounts.spotify.com/api/token
     * para obtener un token de acceso de tipo "Authorization Code"
     */
    private async getAndSaveToken(url: string, requestOptions: any): Promise<any> {
        this.http.post(url, requestOptions.body, {headers: requestOptions.headers,})
        .subscribe(response => {
            let data: any = {...response};
            
            console.log("token.service getAndSaveToken() access token object:", data);
            
            localStorage.setItem(accessTokenKey, data.access_token);
            this.setTimeStampWhenAccessTokenWasTaken();
        });
    }

    /**
     * Registro el momento en el que se obtiene el access_token.
     */
    private setTimeStampWhenAccessTokenWasTaken(): void {
        let actualTime: string = new Date().getTime().toString();

        localStorage.setItem(accessTokenTimestampKey, actualTime);
    }
}