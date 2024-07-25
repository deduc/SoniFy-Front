import { Component } from '@angular/core';

import { APIGetAuthParamsEndpoint, SpotifyAuthUrl, appName, redirectUriKey } from 'src/app/core/constants/constants';
import { AuthParamsInterface } from './interfaces/AuthParamsInterface';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from 'src/app/shared/dialog-error/dialog-error.component';
import { DialogErrorDataInterface } from '../core/interfaces/DialogErrorDataInterface';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public appName: string = appName;
    public redirectUriKey: string = redirectUriKey;

    private dialog: MatDialog;
    private getAuthParamsEndpoint: string = APIGetAuthParamsEndpoint;

    constructor(dialog: MatDialog) {
        this.dialog = dialog;
    }

    ngOnInit(): void {
        // todo
        // ! Temporal, borrar cuando esté a punto
        localStorage.clear();
    }

    // Se invoca desde login.component.html
    public async login(): Promise<void> {
        try {
            const authParams: AuthParamsInterface = await this.getAuthParams(this.getAuthParamsEndpoint);

            localStorage.setItem(this.redirectUriKey, authParams.redirect_uri)

            // Redirecciono al usuario a una pantalla de login con el servicio OAuth2.0.
            // Cuando el usuario acepta OAuth2.0, redirijo al usuario a "home.component.html", ruta "/me/home"
            SpotifyAuthUrl.search = new URLSearchParams({ ...authParams }).toString();
            window.location.href = SpotifyAuthUrl.toString();
        }
        catch (err: any) {
            console.log("LoginComponent.login() ->", err);
            this.openDialog(err.message);
        }
    }

    public openDialog(error: string): void {
        let errorData = {
            data: {
                tittle: "Error de conexión",
                error: error,
                description: "La API está apagada o su url y puertos son incorrectos."
            }
        };

        this.dialog.open(DialogErrorComponent, errorData);
    }

    private async getAuthParams(getAuthParamsEndpoint: string): Promise<AuthParamsInterface> {
        try {
            let authParamsAux: AuthParamsInterface = await this.getAuthParamsFromApi(getAuthParamsEndpoint);

            console.log("LoginService.getAuthParams() -> authParams:", authParamsAux);

            return authParamsAux;
        }
        catch (error) {
            throw Error(`${error}`);
        }
    }

    private async getAuthParamsFromApi(getAuthParamsEndpoint: string): Promise<AuthParamsInterface> {
        let authParams: AuthParamsInterface;

        authParams = await fetch(getAuthParamsEndpoint)
            .then(response => {
                if (!response.ok) { throw new Error(`${response.status} ${response.statusText}`); }

                return response.json();
            })
            .then((data) => {
                return { ...data };
            })
            .catch(error => {
                // TODO: En vez de tirar el error, saca un dialog que informe sobre este.
                this.openDialog(error);
                throw error;
            });

        return authParams;
    }

    // fin clase
}
