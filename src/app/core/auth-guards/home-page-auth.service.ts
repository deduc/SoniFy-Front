import { Injectable } from '@angular/core';

// constantes 
import { ApiGetClientIdAndSecretEndpoint, SpotifyTokenUrl, accessTokenKey, accessTokenTimestampKey, codeFromUrlKey, gotCodeFromUrlKey, loginUrl, oneHourTimeStamp, redirectUriKey } from '../constants/constants';
// navegación entre páginas
import { Router } from '@angular/router';
// peticiones http
import { HttpClient } from '@angular/common/http';
// interfaces
import { SpotifyAppDataInterface } from '../interfaces/SpotifyAppDataInterface';
// servicios
import { TokenService } from '../global-services/token.service';


@Injectable({
    providedIn: 'root',
})
export class HomePageAuthService {
    private router: Router;
    private httpClient: HttpClient
    private tokenService: TokenService;

    // datos de inicio de sesión
    private clientId: string = "null_clientId";
    private clientSecret: string = "null_clientSecret";
    private codeFromUrl: string = "null_codeFromUrl";
    private redirectUri: string = "null_redirectUri";

    // constantes 
    private accessTokenTimestampKey: string = accessTokenTimestampKey;
    private accessTokenKey: string = accessTokenKey;
    private codeFromUrlKey: string = codeFromUrlKey;
    private gotCodeFromUrlKey: string = gotCodeFromUrlKey;
    private loginUrl: string = loginUrl;
    private oneHourTimeStamp: number = oneHourTimeStamp;
    private spotifyTokenUrl: string = SpotifyTokenUrl;


    constructor(router: Router, tokenService: TokenService, httpClient: HttpClient) {
        this.router = router;
        this.tokenService = tokenService;
        this.httpClient = httpClient;
    }

    /** Pseudo-constructor que asigna algunos valores porque "no da tiempo" en el constructor() */
    private postConstructor() {
        console.log("HomePageAuthService.postConstructor() -> Obtengo los codigos de la API, el codigo de la url y la redirect uri.");

        this.getAndSetClientIdsFromAPI(ApiGetClientIdAndSecretEndpoint);
        this.codeFromUrl = this.getcodeFromUrl(this.codeFromUrlKey, this.gotCodeFromUrlKey);
        this.redirectUri = this.getRedirectUri(this.loginUrl);

        localStorage.setItem(this.codeFromUrlKey, this.codeFromUrl);
    }

    /**
     * ! Este método se activa en primer lugar a la hora de gestionar permisos en pages-routing.module
     * ! Retorna True o False para indicar si el usuario puede activar la ruta
     * 
     * Inicializo algunos datos que no puede inicializar el constructor 
     * y compruebo si el usuario tiene o necesita un access_token
     */
    public canActivate(): boolean | void {
        // Pseudo-constructor que asigna algunos valores porque "no da tiempo" en el constructor()
        this.postConstructor();

        setTimeout(() => {
            let semaforo: boolean = this.checkToken();
            return semaforo;
        }, 400);
    }

    private checkToken(): boolean {
        const userNeedsNewToken: boolean = this.checkIfUserNeedsNewToken(this.accessTokenKey, this.accessTokenTimestampKey, this.oneHourTimeStamp);
        let semaforo: boolean = false;

        if (!userNeedsNewToken) {
            console.log("HomePageAuthService.checkIfUserNeedsNewToken() -> hay access_token.");
            semaforo = true;
        }
        else {
            console.log("HomePageAuthService.checkIfUserNeedsNewToken() -> No hay access_token, procedo a obtenerlo.");
            this.getAccessToken();
        }

        return semaforo;
    }

    private getAccessToken(): void {
        const spotifyAppData: SpotifyAppDataInterface = this.getRequestOptionsObj(this.clientId, this.clientSecret, this.codeFromUrl, this.redirectUri);

        this.tokenService.getToken(this.spotifyTokenUrl, spotifyAppData);
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
    private checkIfUserNeedsNewToken(accessTokenKey: string, accessTokenTimestampKey: string, oneHourTimeStamp: number): boolean {
        const accessTokenExists: boolean = this.verifyAccessTokenFromLocalStorage(accessTokenKey);
        const notMoreThan1Hour: boolean = this.verifyAccessTime(accessTokenTimestampKey, oneHourTimeStamp);

        let semaforo: boolean = false;

        if (!accessTokenExists || !notMoreThan1Hour) {
            console.log("HomePageAuthService.checkIfUserNeedsNewToken() -> Usuario necesita un nuevo token");
            semaforo = true;
        }
        else {
            console.log("HomePageAuthService.checkIfUserNeedsNewToken() -> Usuario no necesita un nuevo token");
            semaforo = false;
        }

        return semaforo;
    }

    /**
     * Busco en localstorace el valor de la clave access_token
     */
    private verifyAccessTokenFromLocalStorage(accessTokenKey: string): boolean {
        let semaforo: boolean = false;
        let token: string = localStorage.getItem(accessTokenKey)!;

        if (token && token.length > 0) { semaforo = true; }

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

        // Usuario loggeado desde hace menos de 1 hora.
        if ((actualTime - oldTime) <= oneHourTimeStamp) {
            semaforo = true;
            console.log("HomeService.verifyAccessTime() -> semaforo =", semaforo, ". Usuario loggeado desde hace menos de 1 hora.");
        }

        return semaforo;
    }

    public getAccessTokenLength(accessTokenKey: string): number {
        let tokenLength: number = 0;

        try {
            tokenLength = localStorage.getItem(accessTokenKey)!.length;
        }
        catch (error) {
            tokenLength = 0;
        }

        return tokenLength;
    }

    /**
     * HTTP GET Request a mi API para obtener y guardar clientId y clientSecret.
     */
    private getAndSetClientIdsFromAPI(endpoint: string): void {
        this.httpClient.get(endpoint)
            .subscribe(
                (response) => {
                    let data: any = response;

                    try {
                        this.clientId = data.client_id;
                        this.clientSecret = data.client_secret;
                    }
                    catch (error) {
                        alert("ERROR: No se ha podido obtener los códigos pertinentes de la API. Vuelve al login");
                        this.router.navigateByUrl(this.loginUrl);
                    }
                }
            );
    }

    /**
     * Compruebo que exista el parámetro code de la url en localStorage. 
     * En caso de no existir, lo obtengo de la url y lo guardo en localStorage.
     */
    private getcodeFromUrl(codeFromUrlKey: string, gotCodeFromUrlKey: string): string {
        const queryString = window.location.search;
        let codeFromUrl: string = "";
        let gotCodeFromUrl: string | null = localStorage.getItem(gotCodeFromUrlKey)!;

        // existe el codigo y su valor es 1
        if (gotCodeFromUrl == "1" && typeof (gotCodeFromUrl) != null) {
            console.log("HomePageAuthService.getcodeFromUrl(): El parámetro code existe en localStorage y su valor es 1.");

            codeFromUrl = localStorage.getItem(codeFromUrlKey)!;
        }
        // podria no existir el codigo o su valor no es 1
        else {
            try {
                // obtengo el codigo del parametro code de la url
                codeFromUrl = new URLSearchParams(queryString).get(codeFromUrlKey)!;
                localStorage.setItem(gotCodeFromUrlKey, "1");
            }
            catch (error) {
                localStorage.setItem(gotCodeFromUrlKey, "0");
                alert("ERROR HomePageAuthService.getcodeFromUrl(): No hay código en la URL.\nRedirigiendo a la página de login.");
                this.router.navigateByUrl(loginUrl)
            }
        }

        return codeFromUrl;
    }

    /** Creo el objeto necesario para obtener un access_token de la api de spotify */
    private getRequestOptionsObj(clientId: string, clientSecret: string, codeFromUrl: string, redirectUri: string): SpotifyAppDataInterface {
        let obj: SpotifyAppDataInterface = {
            clientId: clientId,
            clientSecret: clientSecret,
            codeFromUrl: codeFromUrl,
            redirectUri: redirectUri
        }

        return obj;
    }

    /**
     * Obtener redirectUri de localstorage.
     * Si no se puede, mando al usuario de vuelta a /login page
     */
    private getRedirectUri(redirectUrlAux: string): string {
        const redirectUri = localStorage.getItem(redirectUriKey)!;

        if (redirectUri == null) {
            alert("HomePageAuthService.getRedirectUri() -> No hay redirectUri. Te redirijo al login.");
            this.router.navigateByUrl(redirectUrlAux);
        }

        return redirectUri;
    }
}
