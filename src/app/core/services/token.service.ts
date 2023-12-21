import { Injectable } from '@angular/core';

import { SpotifyTokenUrl, accessTokenKey, accessTokenTimestampKey, clientIdKey, clientSecretKey, oneHourTimeStamp } from 'src/app/core/constants/constants';
import { BodyTokenRequestInterface } from '../../pages/home/interfaces/BodyTokenRequestInterface';

/**
 * Clase dedicada a obtener tokens de autenticación con spotify
 */
@Injectable({providedIn: 'root'})
export class TokenService {
    /**
     * Una vez el usuario ha dado permisos en la aplicación autenticadora OAuth2.0, 
     * obtengo el token de acceso a la api de spotify o utilizo el que ya tengo.
     */
    public async checkAccessToken(): Promise<string> {
        const logged: boolean = this.searchAccessToken();
        const notMoreThan1Hour: boolean = this.verifyAccessTime();

        let accessToken: string = localStorage.getItem(accessTokenKey)!;

        // el usuario no ha estado loggeado recientemente
        // o el usuario ha estado loggeado recientemente pero hace más de 1 hora
        if (!logged || logged && !notMoreThan1Hour){
            let clientId: string = localStorage.getItem(clientIdKey)!;
            let clientSecret: string = localStorage.getItem(clientSecretKey)!;
    
            let requestOptions: object = this.makeRequestOptionsObj(clientId, clientSecret);
            accessToken = await this.getAndSetSpotifyAccessToken(requestOptions);
        }

        return accessToken;
    }

    /**
     * Busco en localstorace el valor de la clave access_token
     */
    private searchAccessToken(): boolean{
        let semaforo: boolean = false;
        
        if(localStorage.getItem(accessTokenKey)) semaforo = true;
        
        return semaforo;
    }

    /**
     * Comprobar que el día y la hora actual del sistema no superan en 1 hora (3600 segundos) el momento
     * donde se consiguió el token de acceso.
     */
    private verifyAccessTime(): boolean {
        let semaforo: boolean = false;
        let oldTime: number = parseInt(localStorage.getItem(accessTokenTimestampKey)!);
        let actualTime: number = new Date().getTime();

        if(actualTime - oldTime <= oneHourTimeStamp) semaforo = true;

        return semaforo;
    }
    
    /**
     * Creo un objeto para la obtención de access_token de spotify.
     * 
     * @param clientId 
     * @param clientSecret 
     * @returns Objeto requestOptions
     */
    private makeRequestOptionsObj(clientId: string, clientSecret: string): object{
        const data: BodyTokenRequestInterface = {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
        };
        
        const requestOptions: object = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        };

        return requestOptions;
    }

    /**
     * Hago una consulta a la api de spotify https://accounts.spotify.com/api/token
     * para obtener un token de acceso de tipo "Authorization Code with PKCE Flow"
     * @param requestOptions 
     */
    private async getAndSetSpotifyAccessToken(requestOptions: object): Promise<string> {
        let token:string = "";

        fetch(SpotifyTokenUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta, el token de acceso estará en data.access_token
            console.log("getAndSetSpotifyAccessToken() access token object:", data);
            
            token = data.access_token;
            
            localStorage.setItem(accessTokenKey, data.access_token);
            this.setTimeStampWhenAccessTokenWasTaken();
        })
        .catch(error => {
            // Manejo de errores
            // todo: sacar dialog de error diciendo que la api de spotify no esta disponible ahora
            console.error("Error al obtener el token:", error);
        });

        return token;
    }

    /**
     * Registro el momento en el que se obtiene el access_token.
     */
    private setTimeStampWhenAccessTokenWasTaken(): void {
        let actualTime: string = new Date().getTime().toString();

        localStorage.setItem(accessTokenTimestampKey, actualTime);
    }
}