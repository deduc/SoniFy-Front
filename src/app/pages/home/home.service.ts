import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiGetClientIdAndSecret, SpotifyTokenUrl, accessTokenKey, accessTokenTimestampKey, codeFromUrlKey, gotCodeFromUrlKey, loginUrl, oneHourTimeStamp, redirectUriKey } from 'src/app/core/constants/constants';
import { SpotifyAppDataInterface } from 'src/app/core/interfaces/SpotifyAppDataInterface';
import { TokenService } from 'src/app/core/services/token.service';


@Injectable({
    providedIn: 'root'
})
export class HomeService {
    public router: Router;
    public loginUrl: string = loginUrl;

    private clientId: string = "null_clientId";
    private clientSecret: string = "null_clientSecret";
    private codeFromUrl: string = "null_codeFromUrl";
    private redirectUri: string = "null_redirectUri";
    private spotifyTokenUrl: string = SpotifyTokenUrl;
    private accessTokenKey: string = accessTokenKey;
    private codeFromUrlKey: string = codeFromUrlKey;
    private accessTokenTimestampKey: string = accessTokenTimestampKey;
    private oneHourTimeStamp: number = oneHourTimeStamp;
    
    private accessToken: string = "null_accessToken";
    private tokenService: TokenService;

    constructor(router: Router, tokenService: TokenService) {
        this.router = router;
        this.tokenService = tokenService;

        this.getAndSetClientIdAndSecret(ApiGetClientIdAndSecret);
        this.codeFromUrl = this.getcodeFromUrl(this.codeFromUrlKey);
        this.redirectUri = this.getRedirectUri(this.loginUrl);
    }

    /**
     * Invocado por HomeComponent.ngOnInit().
     * 
     * Compruebo si necesito obtener un access_token y lo obtengo o no.
     */
    public getAccessToken(): void {
        let userNeedsNewToken: boolean = this.checkIfUserNeedsNewAccessToken(this.accessTokenKey, this.accessTokenTimestampKey, this.oneHourTimeStamp)
        
        if (userNeedsNewToken) {
            // Como hago llamadas a la API para obtener los códigos del cliente, hago que la función espere 0.5 segundos.
            setTimeout(async () => {
                localStorage.setItem(codeFromUrlKey, this.codeFromUrl);
                // Todo: estos logs son temporales
                console.log("HomeService.getAccessToken() saved codeFromUrl");
                console.log("HomeService.getAccessToken() Obtengo access_token");
                // Imprimo los datos obtenidos desde el constructor.
                console.log("HomeService.getAccessToken() -> Datos sobre el objeto a enviar", { clientId: this.clientId, clientSecret: this.clientSecret, codeFromUrl: this.codeFromUrl, redirectUri: this.redirectUri, spotifyTokenUrl: this.spotifyTokenUrl});
                
                let requestOptions: SpotifyAppDataInterface = this.makeRequestOptionsObj(this.clientId, this.clientSecret, this.codeFromUrl, this.redirectUri);
                this.tokenService.checkAccessToken(this.spotifyTokenUrl, requestOptions);
            }, 200);
        }
        else{
            console.log("HomeService.getAccessToken() -> El usuario no necesita un nuevo token, hay access_token válido almacenado.");
        }
    }

    /**
     * Comprobar si el usuario, tras hacer login, necesita un nuevo token de acceso por los siguientes 2 motivos:
     * - Usuario nunca se ha loggeado
     *   + No existe access_token en localStorage
     * 
     * - Usuario se loggeó hace más de 1h
     *   + Existe access_token pero accessTokenTimestamp de hace 1h
     * 
     * True si se necesita un nuevo token.
     * False si no se necesita un nuevo token.
     */
    private checkIfUserNeedsNewAccessToken(accessTokenKey: string, accessTokenTimestampKey: string, oneHourTimeStamp: number): boolean{
        let semaforo: boolean = false;

        const accessTokenExists: boolean = this.veryfyAccessTokenFromLocalStorage(accessTokenKey);
        const notMoreThan1Hour: boolean = this.verifyAccessTime(accessTokenTimestampKey, oneHourTimeStamp);

        if (!accessTokenExists && !notMoreThan1Hour) {
            console.log("HomeService.checkIfUserNeedsNewAccessToken() -> Usuario necesita un nuevo token");
            semaforo = true;
        }
        else {
            console.log("HomeService.checkIfUserNeedsNewAccessToken() -> Usuario no necesita un nuevo token");
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
        let codeFromUrl: string = localStorage.getItem(gotCodeFromUrlKey)!;

        if (codeFromUrl == "1"){
            console.log("homeService.getCodeFromUrl(): El parámetro code existe.");
            
            return codeFromUrl;
        }

        try {
            codeFromUrl = new URLSearchParams(queryString).get(codeFromUrlKey)!.toString();
            localStorage.setItem(gotCodeFromUrlKey, "1");

        } catch (error) {
            localStorage.setItem(gotCodeFromUrlKey, "0");
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
    private veryfyAccessTokenFromLocalStorage(accessTokenKey: string): boolean{
        let semaforo: boolean = false;
        
        if(localStorage.getItem(accessTokenKey)) {
            semaforo = true;
        }
        
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

        if(actualTime - oldTime <= oneHourTimeStamp) {
            semaforo = true;

            console.log(
                "HomeService.verifyAccessTime() -> semaforo = ", 
                semaforo, ". Usuario loggeado desde hace menos de 1 hora."
            );
        }

        return semaforo;
    }

    private makeRequestOptionsObj(clientId: string, clientSecret: string, codeFromUrl: string, redirectUri: string): SpotifyAppDataInterface {
        let obj: SpotifyAppDataInterface = {
            clientId: clientId,
            clientSecret: clientSecret,
            codeFromUrl: codeFromUrl,
            redirectUri: redirectUri
        }

        return obj
    }
    
    // fin clase
}
