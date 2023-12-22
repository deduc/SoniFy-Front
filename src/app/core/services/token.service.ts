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
    public async checkAccessToken(clientId: string, clientSecret: string, codeFromUrl: string, redirectUri: string, spotifyTokenUrl: string): Promise<void> {
        const logged: boolean = this.searchToken();
        const notMoreThan1Hour: boolean = this.verifyAccessTime();

        // el usuario no ha estado loggeado
        // o el usuario ha estado loggeado recientemente pero hace más de 1 hora
        if (!logged || logged && !notMoreThan1Hour){
            await this.getToken(clientId, clientSecret, codeFromUrl, redirectUri, spotifyTokenUrl);
        }
        else{
            console.log("Hay token sin expirar.");
        }

        // ! pruebas
        // await this.getToken(clientId, clientSecret, codeFromUrl, redirectUri, spotifyTokenUrl);
    }

    private async getToken(clientId: string, clientSecret: string, codeFromUrl: string, redirectUri: string, spotifyTokenUrl: string): Promise<string> {
        let accessToken: string = "";

        // TODO: ns por que esto no furula kekw

        let requestOptions: any = this.makeRequestOptionsObj(clientId, clientSecret, codeFromUrl, redirectUri);
        accessToken = await this.getAndSaveToken(spotifyTokenUrl, requestOptions);

        return accessToken;
    }

    
    /**
     * Creo un objeto para la obtención de access_token de spotify.
     * 
     * @param clientId 
     * @param clientSecret 
     * @returns Objeto requestOptions
     */
    public makeRequestOptionsObj(clientId: string, clientSecret: string, codeFromUrl: string, redirectUri: string): any {
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
     * Hago una consulta a la api de spotify https://accounts.spotify.com/api/token
     * para obtener un token de acceso de tipo "Authorization Code with PKCE Flow"
     * @param requestOptions 
     */
    private async getAndSaveToken2(url: string, requestOptions: object): Promise<string> {
        let token:string = "";

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta, el token de acceso estará en data.access_token
            // todo borrar este log
            console.log("token.service getAndSaveToken() access token object:", data);
            
            token = data.access_token;
            
            localStorage.setItem(accessTokenKey, data.access_token);
            this.setTimeStampWhenAccessTokenWasTaken();
        })
        .catch(error => {
            // Manejo de errores
            // todo: sacar dialog de error diciendo que la api de spotify no esta disponible ahora
            console.error("getAndSaveToken() Error al obtener el token:", error);
        });

        return token;
    }
    private async getAndSaveToken(url: string, requestOptions: any): Promise<any> {
        this.http.post(url, requestOptions.body, {headers: requestOptions.headers,})
        .subscribe(res => {
            console.log(res);
        });
        
    //     try {
    //       const response = await this.http.post(url, requestOptions.body, {
    //         headers: requestOptions.headers,
    //       }).toPromise();
    
    //       // Aquí puedes manejar la respuesta según tus necesidades.
    //       // Por ejemplo, podrías almacenar el token en el almacenamiento local.
    
    //       console.log('Token response:', response);
    //       return response;
    //     } catch (error) {
    //       console.error('Error getting token:', error);
    //       throw error;
    //     }
      }
    


    /**
     * Registro el momento en el que se obtiene el access_token.
     */
    private setTimeStampWhenAccessTokenWasTaken(): void {
        let actualTime: string = new Date().getTime().toString();

        localStorage.setItem(accessTokenTimestampKey, actualTime);
    }

    /**
     * Busco en localstorace el valor de la clave access_token
     */
    private searchToken(): boolean{
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


}