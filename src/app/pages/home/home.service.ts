import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiGetClientIdAndSecret, SpotifyTokenUrl, accessTokenKey, accessTokenTimestampKey, codeFromUrlKey, gotCodeFromUrl, loginUrl, oneHourTimeStamp, redirectUriKey } from 'src/app/core/constants/constants';
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
        this.getAndSetClientIdAndSecret(ApiGetClientIdAndSecret);
        this.codeFromUrl = this.getcodeFromUrl(this.codeFromUrlKey);
        this.redirectUri = this.getRedirectUri(this.loginUrl);
    }

    /**
     * Invocado por HomeComponent.ngOnInit()
     */
    public getAccessToken(): void {
        // Como hago llamadas a la API para obtener los códigos del cliente, hago que la función espere 0.5 segundos.
        setTimeout(async () => {
            // Imprimo los datos obtenidos desde el constructor.
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
     * HTTP GET Request a mi API para obtener y guardar clientId y clientSecret.
     */
    private getAndSetClientIdAndSecret(endpoint: string): void {
        try {
            fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                this.clientId = data.client_id;
                this.clientSecret = data.client_secret;
            })
        } catch (error) {
            console.log(error);
            alert("HomeService getAndSetClientIdAndSecret() No se ha podido contactar con la API.")
                        
        }
    }

    /**
     * Navegar entre distintas rutas de la web.
     */
    private navigate(url: string): void {
        this.router.navigateByUrl(url);
    }

    /**
     * Compruebo que exista el parámetro code de la url en localStorage. 
     * En caso de no existir, lo obtengo de la url y lo guardo en localStorage.
     * 
     * ! TODO: Mejorar este apartado para no ejecutar este método, desde el constructor, cada vez que el usuario pasa por homeComponent.
     * En caso que haya obtenido el código anteriormente y el usuario se mueva entre las distintas urls de la web,
     * lo obtengo de localStorage (porque la url va a cambiar).
     */
    private getcodeFromUrl(codeFromUrlKey: string): string {
        const queryString = window.location.search;
        let codeFromUrl: string = localStorage.getItem(gotCodeFromUrl)!;

        if (codeFromUrl == "1"){
            console.log("homeService.getCodeFromUrl(): El parámetro code existe.");
            
            return codeFromUrl;
        }

        try {
            codeFromUrl = new URLSearchParams(queryString).get(codeFromUrlKey)!.toString();
            localStorage.setItem(gotCodeFromUrl, "1");

        } catch (error) {
            localStorage.setItem(gotCodeFromUrl, "0");
            alert("ERROR homeService.getCodeFromUrl(): No hay código en la URL.\nRedirigiendo a la página de login.");
            this.navigate(loginUrl)
        }
        
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
        console.log("HomeService.consoleLogData()", {
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            codeFromUrl: this.codeFromUrl,
            redirectUri: this.redirectUri,
            spotifyTokenUrl: this.spotifyTokenUrl,
        });
    }
}
