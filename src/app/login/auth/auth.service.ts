import { Injectable } from '@angular/core';

// constantes 
import { ApiGetClientIdAndSecretEndpoint, SpotifyTokenUrl, accessTokenKey, accessTokenTimestampKey, codeFromUrlKey, loginUrl, oneHourTimeStamp, redirectUriKey } from 'src/app/core/constants/constants';
// navegación entre páginas
import { Router } from '@angular/router';
// peticiones http
import { HttpClient } from '@angular/common/http';
// interfaces
import { SpotifyAppDataInterface } from 'src/app/core/interfaces/SpotifyAppDataInterface';
// servicios
import { TokenService } from 'src/app/core/global-services/token.service';

// angular material
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from 'src/app/shared/dialog-error/dialog-error.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClientIdAndSecretInterface } from './interfaces/ClientIdAndSecretInterface';



@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private router: Router;
    private httpClient: HttpClient
    private tokenService: TokenService;
    private dialog: MatDialog;

    // datos de inicio de sesión
    private codeFromUrl: string = "null_codeFromUrl";
    private redirectUri: string = "null_redirectUri";

    // constantes. Keys de localstorage
    private accessTokenTimestampKey: string = accessTokenTimestampKey;
    private accessTokenKey: string = accessTokenKey;
    private codeFromUrlKey: string = codeFromUrlKey;

    // otras constantes
    private apiGetClientIdAndSecretEndpoint: string = ApiGetClientIdAndSecretEndpoint;
    private loginUrl: string = loginUrl;
    private oneHourTimeStamp: number = oneHourTimeStamp;
    private spotifyTokenUrl: string = SpotifyTokenUrl;

    constructor(router: Router, tokenService: TokenService, httpClient: HttpClient, dialog: MatDialog) {
        this.router = router;
        this.tokenService = tokenService;
        this.httpClient = httpClient;
        this.dialog = dialog;
    }

    /**
     * comprobar code from url, redirect uri, access_token y su caducidad
     */
    public autenticateUser(): boolean {
        this.codeFromUrl = this.getcodeFromUrl(this.codeFromUrlKey);
        this.redirectUri = this.getRedirectUri(this.loginUrl);
        
        return this.checkToken();
    }

    /**
     * Comprobar si el usuario necesita un token (si se invoca este servicio es porque lo necesita pero por si las moscas)
     * si no tiene token, crearlo
     */
    private checkToken(): boolean {
        if (!this.checkIfUserNeedsNewToken(this.accessTokenKey, this.accessTokenTimestampKey, this.oneHourTimeStamp)) {
            console.log("AuthService.checkToken() -> Sí hay access_token.");

            return true;
        }
        else {
            console.log("AuthService.checkToken() -> No hay access_token, procedo a obtenerlo.");

            return this.getAccessTokenFromSpotifyAPI();
        }
    }

    private getAccessTokenFromSpotifyAPI(): boolean {
        this.getAndSaveClientDataFromApi(this.apiGetClientIdAndSecretEndpoint)
            .subscribe((clientData: ClientIdAndSecretInterface) => {
                let spotifyAppData: SpotifyAppDataInterface = {
                    clientId: clientData.client_id,
                    clientSecret: clientData.client_secret,
                    codeFromUrl: this.codeFromUrl,
                    redirectUri: this.redirectUri
                }

                console.log("AuthService.getAccessTokenFromSpotifyAPI() ->", spotifyAppData);

                return this.tokenService.getToken(this.spotifyTokenUrl, spotifyAppData);
            });

        return false;
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
            console.log("AuthService.checkIfUserNeedsNewToken() -> Usuario sí necesita un nuevo access_token");
            semaforo = true;
        }
        else {
            console.log("AuthService.checkIfUserNeedsNewToken() -> Usuario no necesita un nuevo access_token");
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

    public getAccessTokenFromSpotifyAPILength(accessTokenKey: string): number {
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
    private getAndSaveClientDataFromApi(apiEndpoint: string): Observable<ClientIdAndSecretInterface> {
        return this.httpClient.get<ClientIdAndSecretInterface>(apiEndpoint);
    }

    private getcodeFromUrl(codeFromUrlKey: string): string {
        const urlParams = window.location.search;
        let codeFromUrl: string = "";

        // obtengo el codigo del parametro code de la url
        codeFromUrl = new URLSearchParams(urlParams).get(codeFromUrlKey)!;

        if (codeFromUrl != null && codeFromUrl.length > 1) {
            localStorage.setItem(codeFromUrlKey, codeFromUrl);

            return codeFromUrl;
        }
        else {
            let mensajeError = "ERROR AuthService.getcodeFromUrl(): No existe el parámetro code en la URL.";
            // this.openDialog(mensajeError);
            // this.router.navigateByUrl(this.loginUrl);
            console.log(mensajeError);
        }

        return codeFromUrl;
    }

    /**
     * Obtener redirectUri de localstorage (se obtiene en LoginComponent y con una llamada a SoniFy-API).
     * Si no se puede, mando al usuario de vuelta a /login page
     */
    private getRedirectUri(redirectUrlAux: string): string {
        const redirectUri = localStorage.getItem(redirectUriKey)!;

        if (redirectUri == null) {
            let mensajeError: string = "AuthService.getRedirectUri() -> No hay redirectUri. Te redirijo al login.";
            this.openDialog(mensajeError)
            this.router.navigateByUrl(redirectUrlAux);
        }

        return redirectUri;
    }

    private openDialog(error: string): void {
        let infoError = { data: error }
        this.dialog.open(DialogErrorComponent, infoError);
    }
}
