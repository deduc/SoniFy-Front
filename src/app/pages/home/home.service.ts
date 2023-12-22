import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiGetClientIdAndSecret, SpotifyTokenUrl, accessTokenKey, accessTokenTimestampKey, codeFromUrlKey, loginUrl, oneHourTimeStamp, redirectUriKey } from 'src/app/core/constants/constants';
import { TokenService } from 'src/app/core/services/token.service';


@Injectable({
    providedIn: 'root'
})
export class HomeService {
    public router: Router;
    public loginUrl: string;

    private clientId: string = "null_clientId";
    private clientSecret: string = "null_clientSecret";
    private codeFromUrl: string = "null_codeFromUrl";
    private redirectUri: string = "null_redirectUri";
    private spotifyTokenUrl: string = "null_spotifyTokenUrl";

    private accessToken: string = "null_accessToken";
    
    private accessTokenKey: string;
    private codeFromUrlKey: string;
    private accessTokenTimestampKey: string;
    private oneHourTimeStamp: number;

    private tokenService: TokenService

    constructor(router: Router, tokenService: TokenService) {
        this.router = router;
        this.tokenService = tokenService;
        
        // Valor de las variables asignadas por constantes.
        this.loginUrl = loginUrl;
        this.spotifyTokenUrl = SpotifyTokenUrl;
        this.codeFromUrlKey = codeFromUrlKey;
        this.accessTokenKey = accessTokenKey;
        this.accessTokenTimestampKey = accessTokenTimestampKey;
        this.oneHourTimeStamp = oneHourTimeStamp;
        
        // Valor de las variables asignadas mediante funciones.
        this.setClientIdAndSecret(ApiGetClientIdAndSecret);
        this.codeFromUrl = this.getcodeFromUrl(this.codeFromUrlKey);
        this.redirectUri = this.getRedirectUri(this.loginUrl);
    }

    /**
     * Invocado por home.component.ts en ngOnInit()
     */
    public getAccessToken(): void {
        setTimeout(async () => {
            this.consoleLogData();

            if (this.checkIfUserNeedsNewAccessToken(this.accessTokenKey, this.accessTokenTimestampKey, this.oneHourTimeStamp)) {
                // this.accessToken = await this.tokenService.checkAccessToken(this.clientId, this.clientSecret, this.codeFromUrl, this.redirectUri, this.spotifyTokenUrl);
                await this.tokenService.checkAccessToken(this.clientId, this.clientSecret, this.codeFromUrl, this.redirectUri, this.spotifyTokenUrl);
                
                localStorage.setItem(codeFromUrlKey, this.codeFromUrl);
                console.log("codeFromUrl", localStorage.getItem(codeFromUrlKey));
            }
            else{
                console.log("Hay code válido almacenado, no obtengo un nuevo token.");
            }
        }, 500);
    }

    public navigate(url: string): void{
        this.router.navigateByUrl(url);
    }

    /**
     * Comprobar si el usuario necesita un nuevo token de acceso por los siguientes 2 motivos:
     * - El usuario no se ha loggeado.
     * - El usuario se ha loggeado pero hace más de 1 hora.
     */
    private checkIfUserNeedsNewAccessToken(accessTokenKey: string, accessTokenTimestampKey: string, oneHourTimeStamp: number): boolean{
        let semaforo: boolean = false;

        const logged: boolean = this.searchToken(accessTokenKey);
        const notMoreThan1Hour: boolean = this.verifyAccessTime(accessTokenTimestampKey, oneHourTimeStamp);

        // el usuario no ha estado loggeado
        // o el usuario ha estado loggeado recientemente pero hace más de 1 hora
        if (!logged || logged && !notMoreThan1Hour){
            console.log("Usuario sin sesión iniciada o desde hace más de 1 hora.");
            semaforo = true;
        }
        else{
            this.accessToken = localStorage.getItem(accessTokenKey)!;
            console.log("Hay token sin expirar:", this.accessToken);
        }

        return semaforo;
    }

    /**
     * HTTP GET Request a mi API para obtener estos 2 datos.
     */
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
            alert("HomeService setClientIdAndSecret() No se ha podido contactar con la API.")
                        
        }
    }

    private getcodeFromUrl(codeFromUrlKey: string): string {
        const queryString = window.location.search;
        const codeFromUrl: string = new URLSearchParams(queryString).get(codeFromUrlKey)!.toString();
      
        return codeFromUrl;
    }

    private getRedirectUri(redirectUrlAux: string): string {
        const redirectUri = localStorage.getItem(redirectUriKey)!;

        if (redirectUri == null){
            alert("No hay redirectUri. Te redirijo al login.");
            this.navigate(redirectUrlAux);
        }

        return redirectUri;
    }

    /**
     * Busco en localstorace el valor de la clave access_token
     */
    private searchToken(accessTokenKey: string): boolean{
        let semaforo: boolean = false;
        
        if(localStorage.getItem(accessTokenKey)) semaforo = true;
        
        return semaforo;
    }

    /**
     * Comprobar que el día y la hora actual del sistema no superan en 1 hora (3600 segundos) el momento
     * donde se consiguió el token de acceso.
     */
    private verifyAccessTime(accessTokenTimestampKey: string, oneHourTimeStamp: number): boolean {
        let semaforo: boolean = false;
        let oldTime: number = parseInt(localStorage.getItem(accessTokenTimestampKey)!);
        let actualTime: number = new Date().getTime();

        if(actualTime - oldTime <= oneHourTimeStamp) semaforo = true;

        return semaforo;
    }
    
    /**
     * Imprimo por consola los valores de clientId, clientSecret, codeFromUrl, redirectUri y spotifyTokenUrl
     */
    private consoleLogData(){
        console.log("HomeService consoleLogData()", {
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            codeFromUrl: this.codeFromUrl,
            redirectUri: this.redirectUri,
            spotifyTokenUrl: this.spotifyTokenUrl,
        });

    }
}
