import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

import { AuthParamsInterface } from './interfaces/AuthParamsInterface';
import { APIMakeAuthParams, SpotifyAuthUrl } from "src/app/core/constants/constants"


@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    public async getAuthParams(): Promise<AuthParamsInterface> {
        let codeChallenge: string = await this.doMakeCodeChallenge();

        try {
            let authParamsAux: AuthParamsInterface = await this.getAuthParamsFromApi(codeChallenge);
            return authParamsAux;
            
            // let authParams = {...authParamsAux}
            // SpotifyAuthUrl.search = new URLSearchParams(authParams).toString();
            // window.location.href = SpotifyAuthUrl.toString();
        }
        catch (error){
            throw Error(`${error}`);
        }
    }

    private async getAuthParamsFromApi(codeChallenge: string): Promise<AuthParamsInterface> {
        const url: string = `${APIMakeAuthParams}e?codeChallenge=${codeChallenge}`;

        let authParams: AuthParamsInterface;
 
        authParams = await fetch(url)
            .then(response => {
                if (! response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                return response.json();
            })
            .then((data) => {
                return {...data};
            })
            .catch(error => {
                // TODO: En vez de tirar el error, saca un dialog que informe sobre este.
                throw error;
            });

        return authParams;
    }
        
    private doSendCodeChallengeToAPI(codeChallenge: string): Observable<AuthParamsInterface> {
        const url: string = `${APIMakeAuthParams}?codeChallenge=${codeChallenge}`;
    
        return this.http.get(url)
        .pipe(
            catchError((error) => {
                // API apagada
                if (error.status === 0) {
                    // TODO: Sacar un dialog con esto
                    console.error('Error de conexión: No se puede acceder al servidor.');
                }
                else {
                    // TODO: Sacar un dialog con esto
                    console.error('Error:', error);
                }
                return throwError(() => error);
            }),
            map((res: any) => {
                return res as AuthParamsInterface;
            })
        );
    }
    
    private async doMakeCodeChallenge(): Promise<string> {
        let codeVerifier: string = this.generateRandomString(64);
        let hashed: ArrayBuffer = await this.sha256(codeVerifier);
        let codeChallenge: string = this.base64encode(hashed);
        
        return codeChallenge;
    }

    
    private generateRandomString(length: number): string {
        const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values: Uint8Array = crypto.getRandomValues(new Uint8Array(length));

        return values.reduce((acc, x) => acc + possible[x % possible.length], '');
    }

    private sha256(plain: string): Promise<ArrayBuffer> {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
    
        return window.crypto.subtle.digest('SHA-256', data);
    }

    private base64encode(input: ArrayBuffer): string {
        const binaryString = String.fromCharCode(...new Uint8Array(input));
        
        return btoa(binaryString)
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    // fin de la clase
}
