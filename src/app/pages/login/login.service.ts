import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

import { AuthParamsInterface } from './interfaces/AuthParamsInterface';
import { APIMakeAuthParams, SpotifyAuthUrl } from "src/app/core/constants/constants"
import { ClientSecretInterface } from './interfaces/ClientSecretInterface';


@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    /**
     * Get an Authorization Code with PKCE Flow
     */
    public async getAuthParams(): Promise<AuthParamsInterface> {
        let codeChallenge: string = await this.makeCodeChallenge();

        try {
            let authParamsAux: AuthParamsInterface = await this.getAuthParamsFromApi(codeChallenge);
            return authParamsAux;
        }
        catch (error){
            throw Error(`${error}`);
        }
    }
    
    /**
     * API GET request to obtain the secret client code
     */
    public async getClientSecret(url: string): Promise<string> {
        let datos: ClientSecretInterface = await fetch(url)
            .then(response => {
                if (! response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch(error => {
                // TODO: En vez de tirar el error, saca un dialog que informe sobre este.            
                throw error;
            });

        return datos.client_secret;
    }

    private async getAuthParamsFromApi(codeChallenge: string): Promise<AuthParamsInterface> {
        const url: string = `${APIMakeAuthParams}?codeChallenge=${codeChallenge}`;

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
    
    private async makeCodeChallenge(): Promise<string> {
        let codeVerifier: string = this.generateCodeVerifiergenerateRandomString(64);
        localStorage.setItem('code_verifier', codeVerifier);

        let hashed: ArrayBuffer = await this.sha256(codeVerifier);
        let codeChallenge: string = this.base64encode(hashed);
        
        return codeChallenge;
    }

    
    private generateCodeVerifiergenerateRandomString(length: number): string {
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
