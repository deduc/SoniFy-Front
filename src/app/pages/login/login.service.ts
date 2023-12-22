import { Injectable } from '@angular/core';

import { AuthParamsInterface } from './interfaces/AuthParamsInterface';


@Injectable({
    providedIn: 'root',
})
export class LoginService {
    /**
     * Proceso de Authorization Code Flow
     */
    public async getAuthParams(apiEndpoint: string): Promise<AuthParamsInterface> {
        try {
            let authParamsAux: AuthParamsInterface = await this.getAuthParamsFromApi(apiEndpoint);
            return authParamsAux;
        }
        catch (error){
            throw Error(`${error}`);
        }
    }

    private async getAuthParamsFromApi(apiEndpoint: string): Promise<AuthParamsInterface> {
        let authParams: AuthParamsInterface;
 
        authParams = await fetch(apiEndpoint)
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
    // fin de la clase
}
