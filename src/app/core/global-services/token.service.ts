import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { accessTokenKey, accessTokenTimestampKey, homeUrl, oneHourTimeStamp } from 'src/app/core/constants/constants';
import { SpotifyAppDataInterface } from '../interfaces/SpotifyAppDataInterface';
import { DataEmitterService } from './data-emitter.service';


/**
 * Clase dedicada a obtener tokens de autenticación con spotify
 */
@Injectable({ providedIn: 'root' })
export class TokenService {
    private homeUrl: string;
    private http: HttpClient;
    private dataEmitterService: DataEmitterService;


    constructor(http: HttpClient, dataEmitterService: DataEmitterService) {
        this.homeUrl = homeUrl;
        this.http = http;
        this.dataEmitterService = dataEmitterService;
    }

    /**
     * Creo el objeto necesario (con header y body) para obtener el access_token
     * y obtengo y guardo el token en localstorage
     */
    public getToken(spotifyTokenUrl: string, spotifyAppData: SpotifyAppDataInterface): void {
        let requestOptions: any = this.makeRequestOptionsObj(spotifyAppData);

        console.log("TokenService.getToken() -> Obtengo el token y lo guardo en localstorage");
        
        this.getAndSaveToken(spotifyTokenUrl, requestOptions);
    }

    /**
     * Creo un objeto que contiene el header y body necesarios 
     * para hacer una llamada HTTP POST al endpoint de spotify /api/token
     */
    private makeRequestOptionsObj(spotifyAppData: SpotifyAppDataInterface): any {
        const base64Credentials = btoa(`${spotifyAppData.clientId}:${spotifyAppData.clientSecret}`);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64Credentials}`,
        });

        const body = new URLSearchParams();
        body.set('grant_type', 'authorization_code');
        body.set('code', spotifyAppData.codeFromUrl);
        body.set('redirect_uri', spotifyAppData.redirectUri);

        const requestOptions = {
            headers: headers,
            body: body.toString(),
        };

        return requestOptions;
    }

    /**
     * Hago una peticion HTTP POST al endpoint de spotify, 
     * obtengo un token de acceso de tipo "Authorization Code"
     * y refresco la página una vez obtenido y guardado el token de acceso.
     */
    private getAndSaveToken(url: string, requestOptions: any): void {
        this.http.post(url, requestOptions.body, { headers: requestOptions.headers, })
            .subscribe(response => {
                let data: any = { ...response };

                console.log("TokenService.getAndSaveToken() access token object:", data);

                localStorage.setItem(accessTokenKey, data.access_token);
                this.setTimeStampWhenAccessTokenWasTaken();

                this.dataEmitterService.emitAccessToken(data.access_token);

                // this.reloadHomePage();
            });
    }

    /**
     * Registro el momento en el que se obtiene el access_token.
     */
    private setTimeStampWhenAccessTokenWasTaken(): void {
        let actualTime: string = new Date().getTime().toString();

        localStorage.setItem(accessTokenTimestampKey, actualTime);
    }

    /** Refresco la página Home */
    private reloadHomePage() {
        location.href = this.homeUrl;
    }
}